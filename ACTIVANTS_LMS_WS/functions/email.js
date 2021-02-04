const pool = require("../database/Db_Connection");
const keys = require("../config/keys");
async function sendNewsletter(sendEmail, subject, message, attachment) {
  const nodemailer = require("nodemailer");

  let transporter = nodemailer.createTransport({
    host: "smtp.googlemail.com", // Gmail Host
    port: 465, // Port
    secure: true, // this is true as port is 465
    auth: {
      user: keys.mail.user, // generated ethereal user
      pass: keys.mail.pass, // generated ethereal password
    },
  });
  for (i = 0; i < sendEmail.length; i++) {
    try {
      console.log(sendEmail[i]);
      // send mail with defined transport object
      let info = transporter.sendMail({
        from: keys.mail.user, // sender address
        to: sendEmail[i], // list of receivers
        subject: subject, // Subject line
        //text: "Hello world?", // plain text body
        html: message, // html body
        attachments: attachment,
      });
    } catch (error) {}
  }
}

async function sendEmail(sendEmail, subject, message, matter, userID) {
  try {
    const user = await pool.query(
      'SELECT * FROM "CT_NOTIFICATION_PREF" WHERE "ct_user_id" = $1',
      [userID]
    );

    var allowEmail = false;
    console.log("matter");
    console.log(matter);
    if (matter == 0) {
      allowEmail = true;
    }
    if (matter == 2 && user.rows[0].ct_session_scheduling) {
      allowEmail = true;
    }

    if (matter == 3 && user.rows[0].ct_general_reminders) {
      allowEmail = true;
    }

    if (matter == 4 && user.rows[0].ct_product_update) {
      allowEmail = true;
    }

    if (matter == 5 && user.rows[0].ct_newsletter) {
      allowEmail = true;
    }
    if (matter == 6 && user.rows[0].ct_qna) {
      allowEmail = true;
    }

    if (matter == 7 && user.rows[0].ct_sms_sessions_messages) {
      allowEmail = true;
    }
    if (matter == 8 && user.rows[0].ct_product_improvents) {
      allowEmail = true;
    } 
    if (allowEmail) {
      const nodemailer = require("nodemailer");

      let transporter = nodemailer.createTransport({
        host: "smtp.googlemail.com", // Gmail Host
        port: 465, // Port
        secure: true, // this is true as port is 465
        auth: {
          user: keys.mail.user, // generated ethereal user
          pass: keys.mail.pass, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = transporter.sendMail({
        from: keys.mail.user, // sender address
        to: sendEmail, // list of receivers
        subject: subject, // Subject line
        //text: "Hello world?", // plain text body
        html: message, // html body
      });

      console.log("Message sent ");
    } else {
      console.log("Message sent: no permission to send");
    }
  } catch (error) {
    console.log("Email");
    console.log(error.message);
  }
}
module.exports = { sendEmail, sendNewsletter };
