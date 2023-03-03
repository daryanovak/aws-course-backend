const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const { productId } = event.pathParameters; // assumes productId is passed in the path
  try {
    const productResult = await dynamodb.get({
      TableName: process.env.PRODUCTS_TABLE,
      Key: { id: productId },
      ProjectionExpression: 'id, title, description, price',
    }).promise();

    const stockResult = await dynamodb.get({
      Key: { product_id: productId },
      TableName: process.env.STOCKS_TABLE,
      ExpressionAttributeNames: {
        '#pid': 'product_id',
        '#cnt': 'count'
      },
      ProjectionExpression:  '#pid, #cnt',
    }).promise();

    const product = productResult.Item;
    const stock = stockResult.Item || { count: 0 }; // if no stock record is found, default to count of 0

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ ...product, count: stock.count }),
      isBase64Encoded: false,
    };

    return response; 
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error retrieving product from database'
      }),
      isBase64Encoded: false,
    };
  }
};
