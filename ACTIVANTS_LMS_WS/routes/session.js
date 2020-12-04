const router = require("express").Router();
const pool = require("../database/Db_Connection");
const authorization = require("../middleware/authorization");

router.get("/counsellor/declined", authorization, async (req, res) => {
  try {

    const declinedSession = await pool.query('SELECT id, ct_session_start_time, ct_session_end_time, ct_session_date, ct_user_id, ct_counsellor_id, ct_counsellor_timezone_code, ct_counsellor_response, "ct_counsellor_eventID",  "TX_USER_NAME","TX_USER_EMAIL" FROM "CT_COUNSELLOR_REQUESTS" INNER JOIN "T_USER" ON CAST("CT_COUNSELLOR_REQUESTS"."ct_user_id" AS int) = "T_USER"."ID_USER_UUID" where "CT_COUNSELLOR_REQUESTS"."ct_counsellor_id" = $1 AND "CT_COUNSELLOR_REQUESTS"."ct_counsellor_response" = $2',
      [req.user, '0']);


    res.json(declinedSession.rows);
  } catch (error) {
    console.log(error.message);
  }
})

router.get("/getUserChangeRequests/:id", authorization, async (req, res) => {
  const id = req.params.id;

  try {
    console.log(id)
    const userChangeRequests = await pool.query('SELECT id, ct_session_start_time, ct_session_end_time, ct_session_date, ct_user_id, ct_counsellor_id, ct_counsellor_timezone_code, ct_counsellor_response, "ct_counsellor_eventID",  "TX_USER_NAME","TX_USER_EMAIL" FROM "CT_COUNSELLOR_REQUESTS" INNER JOIN "T_USER" ON CAST("CT_COUNSELLOR_REQUESTS"."ct_counsellor_id" AS int) = "T_USER"."ID_USER_UUID" where "CT_COUNSELLOR_REQUESTS"."ct_user_id" = $1 AND "CT_COUNSELLOR_REQUESTS"."ct_counsellor_response" = $2',
      [id, '2']);

    var sessionList = [];

    for (let x = 0; x < userChangeRequests.rowCount; x++) {

      var ChangeRequests = await pool.query('SELECT  * FROM "CT_COUNSELLOR_CHANGE_SESSIONS"  WHERE "ct_requestID"  = $1 ',
        [userChangeRequests.rows[x].id.toString()]);
      var objectRequest = userChangeRequests.rows[x];
      var object = { request: objectRequest, changeRequests: ChangeRequests.rows };
      sessionList.push(object);
    }
    res.json(sessionList);

  } catch (error) {
    console.log(error.message);
  }
})


router.post("/user/sessionchange", authorization, async (req, res) => {
  try {
    const data = req.body;
    if (data.session.length > 0) {
      const updateRequest = await pool.query('UPDATE "CT_COUNSELLOR_REQUESTS" SET "ct_counsellor_response" = $1 WHERE "id" = $2',
        [5, data.requestID]);
      data.session.forEach(insertChangeSession);

      function insertChangeSession(item, index) {

        var date = item.date;
        var sessionDetails = item.sessionDetails;

        var datestr = date.split("T");
        var datestr3 = datestr[0].split("-");

        var day = (parseInt(datestr3[2]) + 1).toString();

        var startDate = datestr3[0] + "-" + datestr3[1] + "-" + day + "T" + sessionDetails.ct_from + ":00.000+08:00";
        var endDate = datestr3[0] + "-" + datestr3[1] + "-" + day + "T" + sessionDetails.ct_to + ":00.000+08:00";

        pool.query(
          'INSERT INTO "CT_COUNSELLOR_CHANGE_SESSIONS" (   ct_session_date, ct_session_start_time, ct_session_end_time, ct_counsellor_id, ct_user_id,  "ct_requestID"  ) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
          [startDate, startDate, endDate, item.counsellorId, item.userId, data.requestID]);

      }

    }

    res.status(200).json("Successful");

  } catch (error) {
    console.log(error.message);

    res.status(400).json("Error");
  }
})




router.post("/sessionchange", authorization, async (req, res) => {
  try {

    const data = req.body;

    const updateRequest = await pool.query('UPDATE "CT_COUNSELLOR_REQUESTS" SET "ct_counsellor_response" = $1 WHERE "id" = $2',
      [2, data.requestID]);

    if (data.session.length > 0) {

      data.session.forEach(insertChangeSession);

      function insertChangeSession(item, index) {

        var date = item.date;
        var sessionDetails = item.sessionDetails;

        var datestr = date.split("T");
        var datestr3 = datestr[0].split("-");

        var day = (parseInt(datestr3[2]) + 1).toString();

        var startDate = datestr3[0] + "-" + datestr3[1] + "-" + day + "T" + sessionDetails.ct_from + ":00.000+08:00";
        var endDate = datestr3[0] + "-" + datestr3[1] + "-" + day + "T" + sessionDetails.ct_to + ":00.000+08:00";

        pool.query(
          'INSERT INTO "CT_COUNSELLOR_CHANGE_SESSIONS" (   ct_session_date, ct_session_start_time, ct_session_end_time, ct_counsellor_id, ct_user_id,  "ct_requestID"  ) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
          [startDate, startDate, endDate, item.counsellorId, item.userId, data.requestID]);

      }
      const updateRequest = pool.query('UPDATE "CT_COUNSELLOR_REQUESTS" SET "ct_counsellor_response" = $1 WHERE "id" = $2',
        ['2', data.requestID]);

    }
    res.status(200).json("Successful");

  } catch (error) {
    console.log(error.message);

    res.status(400).json("Error");
  }
})

router.post("/user/acceptChange", authorization, async (req, res) => {
  try {
    console.log(req.body);
    var ChangeRequests = await pool.query('SELECT  * FROM "CT_COUNSELLOR_CHANGE_SESSIONS"  WHERE "id"  = $1 ',
      [req.body.session]);
    console.log(ChangeRequests);
    const updateRequest = await pool.query('UPDATE "CT_COUNSELLOR_REQUESTS" SET "ct_counsellor_response" = $1 , "ct_session_start_time"= $2, "ct_session_end_time"= $3, ct_session_date = $4  WHERE "id" = $5',
      ['5', ChangeRequests.rows[0].ct_session_start_time, ChangeRequests.rows[0].ct_session_end_time, ChangeRequests.rows[0].ct_session_date, ChangeRequests.rows[0].ct_requestID]);

    res.status(200).json("Successful");
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Error");
  }
})



router.get("/counsellor/ChangeRequests/", authorization, async (req, res) => {

  try {
    // console.log(id) 
    const userChangeRequests = await pool.query('SELECT id, ct_session_start_time, ct_session_end_time, ct_session_date, ct_user_id, ct_counsellor_id, ct_counsellor_timezone_code, ct_counsellor_response, "ct_counsellor_eventID",  "TX_USER_NAME","TX_USER_EMAIL" FROM "CT_COUNSELLOR_REQUESTS" INNER JOIN "T_USER" ON CAST("CT_COUNSELLOR_REQUESTS"."ct_user_id" AS int) = "T_USER"."ID_USER_UUID" where "CT_COUNSELLOR_REQUESTS"."ct_counsellor_id" = $1 AND "CT_COUNSELLOR_REQUESTS"."ct_counsellor_response" = $2',
      [req.user, '2']);

    var sessionList = [];
    for (let x = 0; x < userChangeRequests.rowCount; x++) {
      var ChangeRequests = await pool.query('SELECT  * FROM "CT_COUNSELLOR_CHANGE_SESSIONS"  WHERE "ct_requestID"  = $1 ',
        [userChangeRequests.rows[x].id.toString()]);
      var objectRequest = userChangeRequests.rows[x];

      var object = { request: objectRequest, changeRequests: ChangeRequests.rows };
      sessionList.push(object);
    }
    res.json(sessionList);

  } catch (error) {
    console.log(error.message);
  }
});



router.get("/accepted/:id", authorization, async (req, res) => {
  try {

    const id = req.params.id;
    const acceptedSession = await pool.query(' SELECT id, ct_session_date, ct_session_start_time, ct_session_end_time, ct_meeting_url, ct_password_url, ct_counsellor_id, ct_user_id, "ct_counsellor_eventID","TX_USER_NAME","TX_USER_EMAIL" FROM "CT_COUNSELLOR_SESSIONS" INNER JOIN "T_USER" ON CAST("CT_COUNSELLOR_SESSIONS"."ct_user_id" AS int) = "T_USER"."ID_USER_UUID" where "CT_COUNSELLOR_SESSIONS"."ct_counsellor_id" = $1 ',
      [id]);

    console.log("req.uddddser");
    console.log(acceptedSession.rows);
    res.json(acceptedSession.rows);
  } catch (error) {
    console.log(error.message);
  }
})

router.get("/user/accepted/:id", authorization, async (req, res) => {
  try {
    const id = req.params.id;
    const acceptedSession = await pool.query(' SELECT id, ct_session_date, ct_session_start_time, ct_session_end_time, ct_meeting_url, ct_password_url, ct_counsellor_id, ct_user_id, "ct_counsellor_eventID","TX_USER_NAME","TX_USER_EMAIL" FROM "CT_COUNSELLOR_SESSIONS" INNER JOIN "T_USER" ON CAST("CT_COUNSELLOR_SESSIONS"."ct_counsellor_id" AS int) = "T_USER"."ID_USER_UUID" where "CT_COUNSELLOR_SESSIONS"."ct_user_id" = $1 ',
      [id]);
    res.json(acceptedSession.rows);
  } catch (error) {
    console.log(error.message);
  }
})

router.get("/counsellor/acceptChangeRequests/", authorization, async (req, res) => {
  try {
    const acceptedSession = await pool.query('SELECT id, ct_session_start_time, ct_session_end_time, ct_session_date, ct_user_id, ct_counsellor_id, ct_counsellor_timezone_code, ct_counsellor_response, "ct_counsellor_eventID",  "TX_USER_NAME","TX_USER_EMAIL" FROM "CT_COUNSELLOR_REQUESTS" INNER JOIN "T_USER" ON CAST("CT_COUNSELLOR_REQUESTS"."ct_user_id" AS int) = "T_USER"."ID_USER_UUID" where "CT_COUNSELLOR_REQUESTS"."ct_counsellor_id" = $1 AND "CT_COUNSELLOR_REQUESTS"."ct_counsellor_response" = $2',
      [req.user, '5']);
    res.json(acceptedSession.rows);
  } catch (error) {
    console.log(error.message);
  }
})


module.exports = router;