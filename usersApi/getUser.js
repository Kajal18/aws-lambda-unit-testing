const AWS = require('aws-sdk');
const utils = require('./utils');
AWS.config.update({ region: 'us-east-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.USERS_TABLE;

exports.handler = async (event) => {
  try {
    console.log(event.pathParameters);
    const userId = decodeURIComponent(event.pathParameters.user_id);
    const user_id = utils.getUserId(event.headers);
    const params = {
      TableName: tableName,
      KeyConditionExpression: `user_id = :uid`,
      ExpressionAttributeValues: {
        ':uid': userId,
      },
      Limit: 1,
    };
    const data = await dynamodb.query(params).promise();
    return {
      statusCode: 200,
      body: data ? JSON.stringify(data.Items[0]) : null,
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
