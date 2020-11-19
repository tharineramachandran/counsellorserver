
 const keys = require('../config/keys');
 function uploadtoS3( objects, bucket ) {
    try {

        const AWS = require('aws-sdk')
        //  AWS.config.update({  accessKeyId: keys.awsS3.accessKeyId, secretAccessKey: keys.awsS3.secretAccessKey   });
          
          const s3 = new AWS.S3({
            accessKeyId: keys.awsS3.accessKeyId, secretAccessKey: keys.awsS3.secretAccessKey  
        });
        objects.forEach(objectsS3);

        function objectsS3(item, index) {
                      
      
          console.log(item.base64.substring(0, 34  )   );

          var base64 = item.base64.split(',')
    buf = Buffer.from(base64[1] ,'base64')
    var data = { 
      Body: buf,
      Key: item.name ,
      Bucket:   bucket  ,
       
    };
    s3.upload(data, function(err, data){
        if (err) { 
          console.log(err);
          console.log('Error uploading data: ', data); 
        } else {
          console.log('successfully uploaded the object!');
        }
    });
        
        } 
      } catch (error) {
        console.log(error.message);
        return false;
      }
      return true;
}
module.exports = { uploadtoS3 }