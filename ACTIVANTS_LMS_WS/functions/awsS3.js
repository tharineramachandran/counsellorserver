const keys = require("../config/keys");
function uploadtoS3(objects, bucket) {
  try {
    const AWS = require("aws-sdk");
    //  AWS.config.update({  accessKeyId: keys.awsS3.accessKeyId, secretAccessKey: keys.awsS3.secretAccessKey   });

    const s3 = new AWS.S3({
      accessKeyId: keys.awsS3.accessKeyId,
      secretAccessKey: keys.awsS3.secretAccessKey,
    });
    objects.forEach(objectsS3);

    function objectsS3(item, index) {
      var base64 = item.base64.split(",");
      buf = Buffer.from(base64[1], "base64");
      var data = {
        Body: buf,
        Key: item.name,
        Bucket: bucket,
      };
      s3.upload(data, function (err, data) {
        if (err) {
          console.log(err);
          console.log("Error uploading data: ", data);
        } else {
          console.log("successfully uploaded the object!");
        }
      });
    }
  } catch (error) {
    console.log(error.message);
    return false;
  }
  return true;
}

function getFromS3(object, bucket, filename) {
  try {
    const AWS = require("aws-sdk");
    const s3 = new AWS.S3({
      accessKeyId: keys.awsS3.accessKeyId,
      secretAccessKey: keys.awsS3.secretAccessKey,
    });
    const url = s3.getSignedUrl("getObject", {
      Key: object,
      Bucket: bucket,
      Expires: 60 * 5,
      ResponseContentDisposition: "attachment; filename=" + filename + ".pdf",
    });
    return { result: true, url: url };
  } catch (error) {
    console.log(error.message);
    return { result: false };
  }
}

function deleteFromS3( bucket, filename) {
  try {
    const AWS = require("aws-sdk");
    const s3 = new AWS.S3({
      accessKeyId: keys.awsS3.accessKeyId,
      secretAccessKey: keys.awsS3.secretAccessKey,
    });
    
var params = {  Bucket:bucket , Key: filename };
console.log(["ffffffffffffffffffffffffffffff",params])
s3.deleteObject(params, function(err, data) {
  if (err){ console.log("err", err.stack); return false; } // error
  else{  return true;     }       // deleted
});
 
  } catch (error) {
    console.log(error.message);
    return { result: false };
  }
}
module.exports = { uploadtoS3, getFromS3 ,deleteFromS3};
