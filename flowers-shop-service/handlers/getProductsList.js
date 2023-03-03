const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  console.log('Received request:', JSON.stringify(event));
  console.log(`Request type: ${event.httpMethod}`);
  
  try {
    const productsResult = await dynamodb.scan({
      TableName: process.env.PRODUCTS_TABLE,
      ProjectionExpression: 'id, title, description, price',
    }).promise();

    const stocksResult = await dynamodb.scan({
      KeyConditionExpression: 'product_id = #pid',
      TableName: process.env.STOCKS_TABLE,
      ExpressionAttributeNames: {
        '#pid': 'product_id',
        '#cnt': 'count'
      },
      ProjectionExpression:  '#pid, #cnt',
    }).promise();
    

    const combinedData = productsResult.Items.map(product => {
      const stock = stocksResult.Items.find(stock => stock.product_id === product.id);
      return {
        ...product,
        count: stock ? stock.count : 0
      };
    });


    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(combinedData),
      isBase64Encoded: false,
    };

    return response; 
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error retrieving products from database'
      }),
      isBase64Encoded: false,
    };
  }
};