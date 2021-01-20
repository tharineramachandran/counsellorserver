

const pool = require("../database/Db_Connection")
const keys = require('../config/keys');   
 
const client = require('twilio')(keys.twillio.accountSid, keys.twillio.authToken);
function sendSMS( ) {
   try {
 

client.messages.create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+19034195148',
     to: '+6585201483'
   })
  .then(message => console.log(message.sid));
//     const user =   pool.query('SELECT * FROM "CT_NOTIFICATION_PREF" WHERE "ct_user_id" = $1', [
//       userID]);

//     var allowEmail = false;

   
//     if ( user.rows[0].ct_sms_sessions_messages) {
//       allowEmail = true;

//     }

   
//     if (allowEmail ) {
//       const nodemailer = require("nodemailer");

//       let transporter = nodemailer.createTransport({
//         host: 'smtp.googlemail.com', // Gmail Host
//         port: 465, // Port
//         secure: true, // this is true as port is 465
//         auth: {
//           user: 'counsellorapp49@gmail.com', // generated ethereal user
//           pass: 'Red12!@12', // generated ethereal password
//         },
//       });

//       // send mail with defined transport object
//       let info = transporter.sendMail({
//         from: 'counsellorapp49@gmail.com', // sender address
//         to: sendEmail, // list of receivers
//         subject: subject, // Subject line
//         //text: "Hello world?", // plain text body
//         html: message, // html body
//       });

//       console.log("Message sent ");
//     }else { console.log("Message sent: no permission to send" ); }



  } catch (error) {
    console.log("sendSMS");
    console.log(error.message);
  }
}
module.exports = { sendSMS }