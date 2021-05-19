const tableName = process.env.ORG_TABLE;
const { getAllItem } = require('../dynamodbQueries');

exports.handler = async (event) => {
  try {
    const query = event.queryStringParameters;
    const limit = query && query.limit ? parseInt(query.limit) : 2;
    // const user_id = event.requestContext.authorizer.claims.user.user_id;
    const params = {
      TableName: tableName,
    };

    const data = await getAllItem(params);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return new Error(err);
  }
};
