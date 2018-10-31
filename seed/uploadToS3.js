const AWS = require('aws-sdk'); // from AWS SDK
var path = require('path');
var fs = require('fs');

const uploadDir = function(s3Path, bucketName) {

  const s3 = new AWS.S3({
    signatureVersion: 'v4',
    accessKeyId: process.env.KEY_ID,
    secretAccessKey:  process.env.SECRET
  });

  function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
      var filePath = path.join(currentDirPath, name);
      var stat = fs.statSync(filePath);
      if (stat.isFile()) {
        callback(filePath, stat);
      } else if (stat.isDirectory()) {
        walkSync(filePath, callback);
      }
    });
  }

  walkSync(s3Path, function(filePath, stat) {
    let bucketPath = filePath.substring(s3Path.length);
    let params = {Bucket: bucketName, Key: bucketPath, Body: fs.readFileSync(filePath) };
    s3.putObject(params, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log('Successfully uploaded '+ bucketPath +' to ' + bucketName);
      }
    });

  });
};
uploadDir('seed/temp/', 'threed-sach');
