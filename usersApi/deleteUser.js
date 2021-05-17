const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const utils = require('./utils');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.USERS_TABLE;

exports.handler = async (event) => {
  try {
    const user_id = event.requestContext.authorizer.claims.user.user_id;
    const params = {
      TableName: tableName,
      Key: {
        user_id: user_id,
      },
    };
    const data = await dynamodb.delete(params).promise();
    if (!data) {
      throw new Error('No user found');
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'suceess',
      }),
    };
  } catch (err) {
    console.log('Error', err);
    return {
      statuscode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.message ? err.message : 'Something went wrong!',
      }),
    };
  }
};
