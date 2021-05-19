const uuid = require('uuid').v4;
const moment = require('moment');
const bcrypt = require('bcryptjs');
const tableName = process.env.USERS_TABLE;
const OrgTableName = process.env.ORG_TABLE;
const { createItem, getItem } = require('../dynamodbQueries');

exports.handler = async (event) => {
  try {
    let item = JSON.parse(event.body);
    item.id = uuid();
    item.password = bcrypt.hashSync(item.password, 8);
    item.timestamp = moment().unix();
    item.orgId = item.orgId || 0;
    if (item.orgId) {
      const params = {
        TableName: OrgTableName,
        KeyConditionExpression: `id = :orgId`,
        ExpressionAttributeValues: {
          ':orgId': orgId,
        },
      };
      const orgInstance = await getItem(params);
      if (!orgInstance) {
        throw new Error('Organization not found!');
      }
    }
    const data = await createItem({
      TableName: tableName,
      Item: item,
    });
    return {
      statusCode: 200,
      body: item,
    };
  } catch (err) {
    console.log({ err });
    return new Error(err);
  }
};
