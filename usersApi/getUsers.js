const tableName = process.env.USERS_TABLE;
const { getAllItem } = require('../dynamodbQueries');

exports.handler = async (event) => {
  try {
    const query = event.queryStringParameters;
    const params = {
      TableName: tableName,
    };

    if (query && query.orgId) {
      params.FilterExpression = `orgId = :orgId`;
      params.ExpressionAttributeValues = {
        ':orgId': query.orgId,
      };
    }
    const data = await getAllItem(params);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
};
