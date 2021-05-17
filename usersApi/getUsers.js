const AWS = require('aws-sdk');
const utils = require('./utils');
AWS.config.update({ region: 'us-east-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.USERS_TABLE;

exports.handler = async (event) => {
  try {
    const query = event.queryStringParameters;
    const limit = query && query.limit ? parseInt(query.limit) : 2;
    const user_id = event.requestContext.authorizer.claims.user.user_id;
    const params = {
      TableName: tableName,
      KeyConditionExpression: `user_id = :uid`,
      ExpressionAttributeValues: {
        ':uid': user_id,
      },
      Limit: limit,
      ScanIndexForward: false,
    };

    const startTimeStamp = query && query.start ? parseInt(query.start) : 0;
    if (startTimeStamp > 0) {
      params.ExclusiveStartKey = {
        user_id: user_id,
        timestamp: startTimeStamp,
      };
    }
    const data = await dynamodb.query(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
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
