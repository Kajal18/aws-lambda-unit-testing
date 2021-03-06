const tableName = process.env.USERS_TABLE;
const { deleteItem } = require('../dynamodbQueries');

exports.handler = async (event) => {
  try {
    const user_id = event.requestContext.authorizer.claims.user.id;
    const params = {
      TableName: tableName,
      Key: {
        id: user_id,
      },
    };
    const data = await deleteItem(params);
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
    console.log({ err });
    return new Error(err);
  }
};
