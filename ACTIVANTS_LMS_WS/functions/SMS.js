

const pool = require("../database/Db_Connection")
const keys = require('../config/keys');

const client = require('twilio')(keys.twillio.accountSid, keys.twillio.authToken);
async function sendSMS(userID, message, contact) {
  try {

    const user = await pool.query('SELECT * FROM "CT_NOTIFICATION_PREF" WHERE "ct_user_id" = $1', [
      userID]); 
      console.log([userID, message, contact])
    if (user.rows[0].ct_sms_sessions_messages) {
      client.messages.create({
        body: message,
        from: '+12019879531', 

        to: contact
      })
        .then(message => console.log(message.sid));
    }
  } catch (error) {
    console.log("sendSMS");
    console.log(error.message);
  }
}
module.exports = { sendSMS }