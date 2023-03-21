const AWS = require('aws-sdk');
const csv = require('csv-parser');

const s3 = new AWS.S3();
const sqs = new AWS.SQS();

module.exports.handler = async (event, context) => {
  const records = [];
  for (const record of event.Records) {
    const key = record.s3.object.key;
    if (!key.endsWith('.csv')) continue;
    if (!key.startsWith('uploaded/')) continue;
    const stream = s3.getObject({ Bucket: record.s3.bucket.name, Key: key }).createReadStream();
    await new Promise((resolve, reject) => {
      stream.pipe(csv())
        .on('data', async (data) => {
          records.push(data);
        })
        .on('end', async () => {
          try {
            // send each record as an SQS message
            console.log("RECORDS FLOWERS", records)
            for (const record of records) {
              const params = {
                MessageBody: JSON.stringify({
                  id: record.id,
                  title: record.title,
                  description: record.description,
                  price: record.price
                }),
                QueueUrl: "https://sqs.eu-west-1.amazonaws.com/416847255302/catalogItemsQueue"
              };
              await sqs.sendMessage(params).promise();
            }
            resolve();
          } catch (err) {
            console.log(err)
            reject(err);
          }
        })
        .on('error', (err) => {
          console.log(err)
          reject(err);
        });
    });
  }
};
