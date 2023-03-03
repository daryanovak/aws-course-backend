const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const { title, description, price } = JSON.parse(event.body);

  if (!title || !description || !price) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Title, description, and price are required'
      }),
      isBase64Encoded: false,
    };
  }

  const productId = uuid.v4(); // generate a random product ID

  try {
    await dynamodb.put({
      TableName: process.env.PRODUCTS_TABLE,
      Item: {
        id: productId,
        title,
        description,
        price,
      },
    }).promise();

    const response = {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        id: productId,
        title,
        description,
        price,
      }),
      isBase64Encoded: false,
    };

    return response; 
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error creating product'
      }),
      isBase64Encoded: false,
    };
  }
};
