const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();

const createItem = async (params) => {
  console.log({ params });
  const createdInstance = await dynamodb.put(params).promise();
  return createdInstance;
};

const getItem = async (params) => {
  const getItemInstance = await dynamodb.query(params).promise();
  return getItemInstance;
};

const getAllItem = async (params) => {
  const getAllItemInstance = await dynamodb.scan(params).promise();
  return getAllItemInstance;
};

const updateItem = async (params) => {
  const updateItemInstance = await dynamodb.update(params).promise();
  return updateItemInstance;
};

const deleteItem = async (params) => {
  const deleteItemInstance = await dynamodb.delete(params).promise();
  return deleteItemInstance;
};

module.exports = {
  createItem,
  getAllItem,
  getItem,
  updateItem,
  deleteItem,
};
