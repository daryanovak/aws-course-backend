'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');

// Initialize the DynamoDB client
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// Define the tables
const productsTable = 'products';
const stocksTable = 'stocks';

// Define some test examples
const testProducts = [
    {
        id: uuid.v4(),
        title: 'Orchid',
        description: 'Orchid blue',
        price: 12
    },
    {
        id: uuid.v4(),
        title: 'Roses',
        description: 'Red Roses',
        price: 11
    },
    {
        id: uuid.v4(),
        title: 'Daisy',
        description: 'Pink daisy',
        price: 22
    }
];

const testStocks = [
    {
        product_id: testProducts[0].id,
        count: 20
    },
    {
        product_id: testProducts[1].id,
        count: 15
    },
    {
        product_id: testProducts[2].id,
        count: 10
    }
];

// Insert the test examples into the tables
  module.exports.scriptTestData  = async () => {
    try {
        // Insert the test products into the products table
        await Promise.all(testProducts.map(async (product) => {
            const params = {
                TableName: productsTable,
                Item: {
                    'id': {S: product.id},
                    'title': {S: product.title},
                    'description': {S: product.description},
                    'price': {N: product.price.toString()}
                }
            };
            await dynamodb.putItem(params).promise();
        }));

        // Insert the test stocks into the stocks table
        await Promise.all(testStocks.map(async (stock) => {
            const params = {
                TableName: stocksTable,
                Item: {
                    'product_id': {S: stock.product_id},
                    'count': {N: stock.count.toString()}
                }
            };
            await dynamodb.putItem(params).promise();
        }));

        console.log('Test examples have been added to the tables successfully!');
    } catch (error) {
        console.log('Error adding test examples to the tables:', error);
    }
};

// Call the insertTestExamples function
this.scriptTestData();

