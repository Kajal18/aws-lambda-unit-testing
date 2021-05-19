const tableName = process.env.ORG_TABLE;
const { updateItem } = require('../dynamodbQueries');

exports.handler = async (event) => {
  try {
    const { pathParameters } = event;
    const orgId = pathParameters.orgId;
    const body = JSON.parse(event.body);
    if (!orgId) {
      throw new Error('orgId is required!');
    }
    const paramsToUpdate = {
      TableName: tableName,
      Key: {
        id: orgId,
      },
      UpdateExpression: 'set orgName = :orgName, updatedAt = :updateDate',
      ExpressionAttributeValues: {
        ':orgName': body.orgName,
        ':updateDate': new Date().toISOString(),
      },
      ReturnValues: 'UPDATED_NEW',
    };
    const orgInstance = await updateItem(paramsToUpdate);

    return {
      statusCode: 200,
      body: JSON.stringify(orgInstance),
    };
  } catch (err) {
    return new Error(err);
  }
};
