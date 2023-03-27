const sinon = require('sinon');
const { expect } = require('chai');
const { AWS, sns, dynamoDb, handler } = require('../handlers/catalogBatchProces');

describe('handler', () => {
  let dynamoDbStub;
  let snsPublishStub;

  beforeEach(() => {
    dynamoDbStub = sinon.stub(dynamoDb, 'batchWrite').returns({
      promise: () => Promise.resolve(),
    }); 
    snsPublishStub = sinon.stub(sns, 'publish').returns({
      promise: () => Promise.resolve({ MessageId: '123' }),
    });
  });

  afterEach(() => {
    dynamoDbStub.restore();
    snsPublishStub.restore();
  });

  it('should insert products into DynamoDB and publish to SNS', async () => {
    const products = [
      { id: '1', title: 'Product 1', description: 'Product 1 description', price: 10.99 },
      { id: '2', title: 'Product 2', description: 'Product 2 description', price: 20.99 },
    ];

    const event = {
      Records: [
        { body: JSON.stringify(products[0]) },
        { body: JSON.stringify(products[1]) },
      ],
    };

    const result = await handler(event);

    expect(d
