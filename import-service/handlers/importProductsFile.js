const AWS = require('aws-sdk');

const s3 = new AWS.S3({ region: 'eu-west-1' });
const BUCKET_NAME = 'flowers-shop-upload';

module.exports.handler = async (event) => {
  const { name } = event.queryStringParameters;
  const params = {
    Bucket: BUCKET_NAME,
    Key: `uploaded/${name}.csv`,
    Expires: 120
  };

  try {
    const url = await s3.getSignedUrlPromise('getObject', params);
    return {
      statusCode: 200,
      body: url,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Internal server error',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};
