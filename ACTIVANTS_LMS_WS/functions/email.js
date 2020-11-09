
 function sendEmail(sendEmail,subject,message) {
    try {

        const nodemailer = require("nodemailer");
    
        let transporter = nodemailer.createTransport({
          host: 'smtp.googlemail.com', // Gmail Host
          port: 465, // Port
          secure: true, // this is true as port is 465
          auth: {
              user: 'counsellorapp49@gmail.com', // generated ethereal user
              pass: 'Red12!@12', // generated ethereal password
          },
      });
    
      // send mail with defined transport object
      let info =   transporter.sendMail({
          from: 'counsellorapp49@gmail.com', // sender address
          to: sendEmail   , // list of receivers
          subject: subject        , // Subject line
          //text: "Hello world?", // plain text body
          html:message , // html body
      });
    
      console.log("Message sent: %s", info.messageId);
    
    
      } catch (error) {
        console.log(error.message);
      }
}
module.exports = { sendEmail }