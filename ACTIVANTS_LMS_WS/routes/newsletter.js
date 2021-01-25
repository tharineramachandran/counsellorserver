const router = require("express").Router();
const pool = require("../database/Db_Connection");
const authorization = require("../middleware/authorization");

const email = require("../functions/email");
const { baseURLAPI, baseURL } = require("../Global");

router.get("/getAdminEmail", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT  "TX_USER_EMAIL" FROM "T_USER" WHERE "IS_COUNSELLOR" = $1',
      [4]
    );
    console.log(user);
    res.status(200).json(user.rows);
  } catch (error) {
    console.error(["api consellee update", error.message]);
    res
      .status(400)
      .json([{ error: "An error occurred ", message: "An error occurred" }]);
  }
});

router.post("/sendNewsletter", authorization, async (req, res) => {
  try {
    const data = req.body;
    var sendEmails = [];
    var sendusers = [];

    var file = [];
    for (var i = 0; i < data.file.length; i++) {
      file.push({ filename: data.file[i].name, path: data.file[i].base64 });
    }
    if (data.checked) {
      const users = await pool.query(
        'SELECT   "TX_USER_EMAIL"   FROM "CT_NOTIFICATION_PREF" INNER JOIN "T_USER" ON CAST("CT_NOTIFICATION_PREF"."ct_user_id" AS int) = "T_USER"."ID_USER_UUID" where "CT_NOTIFICATION_PREF"."ct_newsletter" = $1  ',
        [true]
      );
      for (var i = 0; i < users.rowCount; i++) {
        console.log("sendusers");

        sendusers.push(users.rows[i].TX_USER_EMAIL);
      }
      sendEmails = sendusers.concat(data.currentValues);
      console.log(sendEmails);
    }

     email.sendNewsletter (sendEmails, data.subject, data.body  ,file )

    res.status(200).json("Successful");
  } catch (error) {
    console.log(error.message);

    res.status(400).json("Error");
  }
});

module.exports = router;
