const tableName = process.env.ORG_TABLE;
const { deleteItem } = require('../dynamodbQueries');

exports.handler = async (event) => {
  try {
    const orgId = event.requestContext.authorizer.claims.user.orgId;
    const params = {
      TableName: tableName,
      Key: {
        id: orgId,
      },
    };
    const data = await deleteItem(params);
    if (!data) {
      throw new Error('No org found');
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'suceess',
      }),
    };
  } catch (err) {
    return new Error(err);
  }
};
