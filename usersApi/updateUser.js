const tableName = process.env.USERS_TABLE;
const OrgTableName = process.env.ORG_TABLE;
const { updateItem, getItem } = require('../dynamodbQueries');

exports.handler = async (event) => {
  try {
    const { pathParameters } = event;
    const userId = pathParameters.user_id;
    const body = JSON.parse(event.body);
    if (!userId) {
      throw new Error('UserId is required!');
    }
    let paramsToUpdate = {
      TableName: tableName,
      Key: {
        id: userId,
      },
      UpdateExpression: 'set updatedAt = :updateDate',
      ExpressionAttributeValues: {
        ':updateDate': new Date().toISOString(),
      },
      ReturnValues: 'UPDATED_NEW',
    };
    console.log('---------', body.orgId);
    if (body && body.orgId) {
      paramsToUpdate.UpdateExpression =
        'set orgId = :orgId, updatedAt = :updateDate';
      paramsToUpdate.ExpressionAttributeValues = {
        ':orgId': body.orgId,
        ':updateDate': new Date().toISOString(),
      };
    } else if (body && body.user_name) {
      paramsToUpdate.UpdateExpression =
        'set user_name = :user_name, updatedAt = :updateDate';
      paramsToUpdate.ExpressionAttributeValues = {
        ':user_name': body.user_name,
        ':updateDate': new Date().toISOString(),
      };
    }
    console.log({ paramsToUpdate });
    const user = await updateItem(paramsToUpdate);

    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (err) {
    console.log({ err });
    return err;
  }
};
