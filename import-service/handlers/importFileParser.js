const AWS = require('aws-sdk');
const csv = require('csv-parser');

const s3 = new AWS.S3();

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
            console.log("MY PARSED FLOWERS", records);
            await s3.copyObject({
              Bucket: record.s3.bucket.name,
              CopySource: `${record.s3.bucket.name}/${key}`,
              Key: key.replace(/^uploaded\//, 'parsed/')
            }).promise();
            await s3.deleteObject({
              Bucket: record.s3.bucket.name,
              Key: key
            }).promise();
            resolve();
          } catch (err) {
            reject(err);
          }
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }
};
