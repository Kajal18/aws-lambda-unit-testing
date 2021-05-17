const AWS = require('aws-sdk');
const moment = require('moment');
const utils = require('./utils');
AWS.config.update({ region: 'us-east-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.USERS_TABLE;

exports.handler = async (event) => {
  try {
    let item = JSON.parse(event.body);
    const userId = decodeURIComponent(event.pathParameters.userId);
    item.user_id =
      userId || event.requestContext.authorizer.claims.user.user_id;
    item.user_name = utils.getUserName(event.headers);
    item.expires = moment().add(10, 'd').unix();
    const data = await dynamodb
      .update({
        TableName: tableName,
        Key: {
          user_id: item.user_id,
        },
        UpdateExpression: 'set user_name = :user_name',
        ConditionExpression: 'user_id = :user_id',
        ExpressionAttributeValues: {
          ':user_name': item.user_name,
          user_id: item.user_id,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise();
    if (!data) {
      throw new Error('No user found');
    }
    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (err) {
    console.log('Eroro', err);
    return {
      statuscode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.message ? err.message : 'Something went wrong!',
      }),
    };
  }
};
