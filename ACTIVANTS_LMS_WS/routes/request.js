const router = require("express").Router();
const pool = require("../database/Db_Connection");
const authorization = require("../middleware/authorization");

const fs = require('fs');
const readline = require('readline');
const keys = require('../config/keys');
const opn = require('opn');

const { google } = require('googleapis');
const passport = require('passport');
 
const notification = require("../functions/noti");
const window = require('window');
const GOOGLE_CLIENT_SECRET = keys.google.clientSecret;
const GOOGLE_CLIENT_ID = keys.google.clientID;

const { baseURLAPI, baseURL } = require('../Global');

const CLIENT_HOME_PAGE_URL = baseURL;
const CLIENT_BASEURL_PAGE_URL = baseURLAPI;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CLIENT_BASEURL_PAGE_URL + "/request/google/callback"
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/calendar'
];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes
});

var requestID = '';
router.get("/getCounsellorRequests/:id", authorization, async (req, res) => {
  try {
    var id = req.params.id;

    const user = await pool.query('SELECT id, ct_session_start_time, ct_session_end_time, ct_session_date, ct_user_id, ct_counsellor_id, ct_counsellor_timezone_code, ct_counsellor_response, "ct_counsellor_eventID",  "TX_USER_NAME","TX_USER_EMAIL" FROM "CT_COUNSELLOR_REQUESTS" INNER JOIN "T_USER" ON CAST("CT_COUNSELLOR_REQUESTS"."ct_user_id" AS int) = "T_USER"."ID_USER_UUID" where "CT_COUNSELLOR_REQUESTS"."ct_counsellor_id" = $1 AND "CT_COUNSELLOR_REQUESTS"."ct_counsellor_response" = $2',
      [id, '3']);

    res.json(user.rows);
  } catch (error) {
    console.log(error.message);
  }
})


router.get("/getTotalCounsellorRequests/:id", authorization, async (req, res) => {
  try {
    var id = req.params.id;

    const user = await pool.query('SELECT  *  FROM "CT_COUNSELLOR_REQUESTS"     where "CT_COUNSELLOR_REQUESTS"."ct_counsellor_id" = $1 AND "CT_COUNSELLOR_REQUESTS"."ct_counsellor_response" = $2',
      [id, '3']);

    res.json(user.rowCount);
  } catch (error) {
    console.log(error.message);
  }
})
router.get("/user/getRequests/:id", authorization, async (req, res) => {
  try {
    var id = req.params.id;

    const user = await pool.query('SELECT id, ct_session_start_time, ct_session_end_time, ct_session_date, ct_user_id, ct_counsellor_id, ct_counsellor_timezone_code, ct_counsellor_response, "ct_counsellor_eventID",  "TX_USER_NAME","TX_USER_EMAIL" FROM "CT_COUNSELLOR_REQUESTS" INNER JOIN "T_USER" ON CAST("CT_COUNSELLOR_REQUESTS"."ct_counsellor_id" AS int) = "T_USER"."ID_USER_UUID" where "CT_COUNSELLOR_REQUESTS"."ct_user_id" = $1 AND "CT_COUNSELLOR_REQUESTS"."ct_counsellor_response" = $2',
      [id, '3']);

    res.json(user.rows);
  } catch (error) {
    console.log(error.message);
  }
})

router.get("/userID", async (req, res) => {

  var userID = await req.query.userID;
  var requestID = await req.query.requestID;
  const existingUser = await pool.query('DELETE FROM "CT_COUNSELLOR_CAL_AUTH" WHERE "ct_counsellor_id" = $1 ',
    [userID]);
  const user = await pool.query('UPDATE "CT_COUNSELLOR_CAL_AUTH" SET "ct_counsellor_id" = $1 WHERE "id" = $2',
    [userID, requestID]);

  res.json("Successful");
});

router.post("/sendResponse", authorization, (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    // const user =   pool.query('UPDATE "CT_COUNSELLOR_REQUESTS" SET "ct_counsellor_response" = $1 WHERE "id" = $2',
    // [data.response,data.requestID]);  
    // console.log(user.rows);

    //Load client secrets from a local file.
    // fs.readFile('credentials.json', (err, content) => {
    //   if (err) return console.log('Error loading client secret file:', err);
    //   // Authorize a client with credentials, then call the Google Calendar API.
    //   authorize(JSON.parse(content), addEvents );
    // });

    res.json("Success");
  } catch (error) {
    console.log(error.message);
  }
})

//1.scope : what info you need to retrieve..  

router.get("/google/:id", async (req, res) => {
  var id = req.params.id;

  if (id == 'get') {

    try {
      var requestID = req.query.requestID;
      var counsellorID = req.query.counsellorID;
      var response = req.query.response;

      const updatedRequest = await pool.query('SELECT * FROM "CT_COUNSELLOR_REQUESTS" WHERE "id" = $1',
        [requestID]);

      if (response == '4' && updatedRequest.rowCount > 0) {

        const deleteRequest = await pool.query('DELETE FROM "CT_COUNSELLOR_REQUESTS" WHERE "id" = $1',
          [requestID]);
        res.status(200).json({ "message": "Delete success" });
      }
      if (response == '1' && updatedRequest.rowCount > 0) {
        const user = await pool.query('SELECT * FROM "CT_COUNSELLOR_CAL_AUTH" WHERE "ct_counsellor_id" = $1',
          [counsellorID]);

        const counsellor = await pool.query('SELECT * FROM "CT_COUNSELLOR_DETAILS" WHERE "CT_COUNSELLOR_ID" = $1',
          [updatedRequest.rows[0].ct_counsellor_id]);

        const counsellee = await pool.query('SELECT *  FROM "T_USER" WHERE "ID_USER_UUID" = $1',
          [parseInt(updatedRequest.rows[0].ct_user_id)]);

        if (user.rowCount > 0) {
          var usertokens =
          {
            access_token: user.rows[0].ct_accesstoken,
            scope: user.rows[0].ct_scope,
            token_type: user.rows[0].ct_token_type,
            expiry_date: user.rows[0].ct_expirydate
          }
          oauth2Client.setCredentials(usertokens);

          // Create Event on Google Calendar

          const calendar = google.calendar({ version: 'v3', oauth2Client });

          var event = {
            'summary': 'Counselling Session ',
            'location': 'Meeting via Google meet',
            'description': 'Counselling session ',
            'start': {
              'dateTime': updatedRequest.rows[0].ct_session_start_time,
              'timeZone': 'Asia/Singapore',
            },
            'end': {
              'dateTime': updatedRequest.rows[0].ct_session_end_time,
              'timeZone': 'Asia/Singapore',
            },
            'attendees': [
              { 'email': counsellor.rows[0].CT_EMAIL },
              { 'email': counsellee.rows[0].TX_USER_EMAIL },
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                { 'method': 'email', 'minutes': 24 * 60 },
                { 'method': 'popup', 'minutes': 10 },
              ],
            },
          };

          // Create a meeting link 
          var eventid = "";
          calendar.events.insert({
            auth: oauth2Client,
            calendarId: 'primary',
            resource: event,
          }, async function (err, event) {
            if (err) {
              console.log('There was an error contacting the Calendar service: ' + err);
              await opn(url);
              res.status(400).json({ "message": "Sign-in to google first" });
            }
            var eventPatch = {
              conferenceData: {
                createRequest: { requestId: "7qxalsvy0e" }
              }
            };
            var eventid = await event.data.id;

            console.log("***************************************************");
            console.log(eventid);

            await calendar.events.patch({
              calendarId: "primary",
              eventId: event.data.id,
              auth: oauth2Client,
              resource: eventPatch,
              sendNotifications: true,
              conferenceDataVersion: 1
            });

            await calendar.events.get({
              calendarId: "primary",
              eventId: eventid,
              auth: oauth2Client
            }, (err, res) => {
              if (err) {
                console.log(err);
              } else {
                // Update session and add session to confirm
                  notification.addNoti( parseInt (updatedRequest.rows[0].ct_user_id)  , "a counsellor accepted your session"   );    
                const updateRequest = pool.query('UPDATE "CT_COUNSELLOR_REQUESTS" SET "ct_counsellor_response" = $1 WHERE "id" = $2',
                  [response, requestID]);
                pool.query(
                  'INSERT INTO "CT_COUNSELLOR_SESSIONS" (    ct_request_id , ct_session_date, ct_session_start_time, ct_session_end_time, ct_meeting_url, ct_password_url, ct_counsellor_id, ct_user_id  ,"ct_counsellor_eventID" ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
                  [parseInt (requestID) ,updatedRequest.rows[0].ct_session_start_time, updatedRequest.rows[0].ct_session_start_time, updatedRequest.rows[0].ct_session_end_time, res.data.hangoutLink, 0, updatedRequest.rows[0].ct_counsellor_id, updatedRequest.rows[0].ct_user_id, eventid]);

              }
            });
            res.status(200).json({ "message": "Success" });
          });
        } else {
          opn(url);
          res.status(400).json({ "message": "Sign-in to google calendar" });
        }
      } else {
        const updateRequest = await pool.query('UPDATE "CT_COUNSELLOR_REQUESTS" SET "ct_counsellor_response" = $1 WHERE "id" = $2',
          [response, requestID]);
        res.status(200).json({ "message": "Success" });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ "message": "An error occurred" });
    }
  }
  if (id == 'callback') {
    try {
      var code = req.query.code;
      const { tokens } = await oauth2Client.getToken(code)
      var pass = passport.user;
      console.log(["====  token", tokens]);
      let newUser = await pool.query(
        'INSERT INTO "CT_COUNSELLOR_CAL_AUTH" ( "ct_accesstoken","ct_scope","ct_expirydate","ct_token_type","ct_refresh_token" ) VALUES ($1, $2,$3,$4,$5  ) RETURNING *',
        [tokens.access_token, tokens.scope, tokens.expiry_date, tokens.token_type, tokens.refresh_token]
      );
      const insertID = newUser.rows[0].id;
      res.redirect(CLIENT_HOME_PAGE_URL + "?id=" + insertID);
    }
    catch (err) {
      console.log(["error", err]);
    }
  }
});

oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    console.log(["Token is adad", tokens.refresh_token]);
    oauth2Client.setCredentials({
      refresh_token: tokens.refresh_token
    });
  }
  console.log(["Token is set", tokens.access_token]);
});


module.exports = router;