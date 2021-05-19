const tableName = process.env.ORG_TABLE;
const { getItem } = require('../dynamodbQueries');

exports.handler = async (event) => {
  try {
    const orgId = decodeURIComponent(event.pathParameters.orgId);
    const params = {
      TableName: tableName,
      KeyConditionExpression: `id = :orgId`,
      ExpressionAttributeValues: {
        ':orgId': orgId,
      },
    };
    const data = await getItem(params);
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items[0]),
    };
  } catch (err) {
    console.log('Error', err);
    return new Error(err);
  }
};
