const AWS = require('aws-sdk');
const config = require('./config');
const uuid = require('uuid');

const credentials = {
  AWS_SECRET_ACCESS_KEY: config.get('AWS_SECRET_ACCESS_KEY'), 
  AWS_ACCESS_KEY_ID: config.get('AWS_ACCESS_KEY_ID'),
}

const S3 = new AWS.S3(credentials);
const upload = (data)=> {
  const regex = new RegExp(/^data:image\/(\w+);.*/);
  const extension = regex.exec(data)[1];
  const buffer = new Buffer(data.replace(/^data:image\/\w+;base64,/, ""),'base64')
  const bucket = config.get('AWS_BUCKET'); 
  const key = `${uuid()}.${extension}`;
  const payload = {
    Key: key, 
    Body: buffer,
    ContentEncoding: 'base64',
    ContentType: `image/${extension}`,
    ACL: 'public-read',
    Bucket: bucket
  };
  return S3.putObject(payload)
    .promise()
    .then( result => {
      return `https://s3.amazonaws.com/${bucket}/${key}`;
    })
};


module.exports = {
  upload
};
