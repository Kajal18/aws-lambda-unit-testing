const aws = require('aws-sdk');
const ddb = new aws.DynamoDB.DocumentClient();
aws.config.update({ region: 'us-east-1' });
const tableName = process.env.USERS_TABLE;

exports.handler = async (event) => {
  try {
    const { pathParameters } = event;
    const userId = pathParameters.user_id;
    const body = JSON.parse(event.body);
    if (!userId) {
      throw new Error('UserId is required!');
    }
    const paramsToUpdate = {
      TableName: tableName,
      Key: {
        user_id: userId,
      },
      UpdateExpression: 'set user_name = :user_name, updatedAt = :updateDate',
      ExpressionAttributeValues: {
        ':user_name': body.user_name,
        ':updateDate': new Date().toISOString(),
      },
      ReturnValues: 'UPDATED_NEW',
    };
    const user = await ddb.update(paramsToUpdate).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (err) {
    console.log({ err });
    throw new Error(err);
  }
};
