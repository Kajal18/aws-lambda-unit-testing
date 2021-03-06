const tableName = process.env.USERS_TABLE;
const { getItem } = require('../dynamodbQueries');

exports.handler = async (event) => {
  try {
    console.log(event.pathParameters);
    const userId = decodeURIComponent(event.pathParameters.user_id);
    const params = {
      TableName: tableName,
      KeyConditionExpression: `id = :uid`,
      ExpressionAttributeValues: {
        ':uid': userId,
      },
      Limit: 1,
    };
    const data = await getItem(params);
    return {
      statusCode: 200,
      body: data ? JSON.stringify(data.Items[0]) : null,
    };
  } catch (err) {
    return new Error(err);
  }
};
