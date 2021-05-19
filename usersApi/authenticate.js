const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const utils = require('../utils/utils');
AWS.config.update({ region: 'us-east-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.USERS_TABLE;
const { getAllItem } = require('../dynamodbQueries');

exports.handler = async (event) => {
  try {
    if (!event.authorizationToken) {
      throw new Error('Missing token!');
    }
    const authToken = event.authorizationToken;
    const jwtToken = authToken.replace('Bearer ', '');
    const decoded = jwt.verify(jwtToken, 'JWT_SECRET');
    console.log({ decoded });
    let params = {
      TableName: tableName,
      FilterExpression: `id = :userId`,
      ExpressionAttributeValues: {
        ':userId': decoded.user.id,
      },
    };
    const userResponse = await getAllItem(params);
    if (userResponse.Items.length > 0) {
      user = userResponse.Items[0];
      const effect = 'Allow';
      const userId = user.id;
      const authorizerContext = { user: JSON.stringify(user) };
      const policyDocument = utils.buildIAMPolicy(
        userId,
        effect,
        event.methodArn,
        authorizerContext
      );
      console.log(
        `${user.email} user authenticated with policy ${policyDocument}`
      );
      delete user.password;
      event.LoggedInUser = user;
      return policyDocument;
    } else {
      console.error('No user found!');
      throw new Error('Invalid Credentials!');
    }
  } catch (e) {
    console.log({ e });
    return {
      // Error response
      // statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      principalId: 'unauthorize',
      body: JSON.stringify({
        error: e.message,
      }),
    };
  }
};
