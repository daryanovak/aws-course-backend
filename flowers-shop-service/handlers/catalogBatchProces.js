const AWS = require('aws-sdk');
const { PRODUCTS_TABLE } = process.env;
const sns = new AWS.SNS();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  const products = event.Records.map((record) => {
    console.log(record.body);
    return JSON.parse(record.body);
  });

  const params = {
    TopicArn: 'arn:aws:sns:eu-west-1:416847255302:createProductTopic',
    Subject: 'New Product Created',
    Message: JSON.stringify(products), 
    MessageAttributes: {
      'ContentType': {
        DataType: 'String',
        StringValue: 'text/plain'
      }
    }
  };

  try {
    console.log('Processing batch of products...');

    console.log(products, "products")
    console.log(event.Records, "HHAHHA")

    const putRequests = products.map((product) => ({
      PutRequest: {
        Item: {
          id: product.id,
          description: product.description,
          price: product.price,
          title: product.title
        },
      },
    }));

    console.log(putRequests, "SDFGHJKGFDDFGHJKHGFDGH")

    await dynamoDb.batchWrite({ 
      RequestItems: {
        [PRODUCTS_TABLE]: putRequests,
      },
    }).promise();

    const publishResult = await sns.publish(params).promise();
    console.log(`Email message published to SNS with message ID ${publishResult.MessageId}`);

    console.log(`Successfully processed ${products.length} products.`);
  } catch (err) {
    console.log('Error processing products: ', err);
    throw err;
  } 
};
