const uuid = require('uuid').v4;
const moment = require('moment');
const tableName = process.env.ORG_TABLE;
const { createItem } = require('../dynamodbQueries');

exports.handler = async (event) => {
  try {
    let item = JSON.parse(event.body);
    item.id = uuid();
    item.createdAt = moment().unix();
    item.updatedAt = moment().unix();
    if (!item.orgName) {
      throw new Error('Organization name is required!');
    }
    const data = await createItem({
      TableName: tableName,
      Item: item,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (err) {
    return new Error(err);
  }
};
