const router = require("express").Router();
const pool = require("../database/Db_Connection");
const authorization = require("../middleware/authorization");

const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const email = require('../functions/email');
router.post("/requestChange", async (req, res) => {
  try {
    const data = req.body.email;


    const user = await pool.query('SELECT * FROM "T_USER" WHERE "TX_USER_EMAIL" = $1', [
      data
    ]);

    if (user.rows.length !== 0) {
      var ct_password_code = Math.floor((Math.random() * 1000) + 99999);

      let newUser = await pool.query(
        'INSERT INTO "CT_PASSWORD_CHANGE" (ct_password_code, ct_userid ) VALUES ($1,$2 ) RETURNING *',
        [ct_password_code, user.rows[0].ID_USER_UUID]
      );
      var subject = "Password Change";
      var message = await "Dear " + user.rows[0].TX_USER_NAME + " ,your password change code is  " + ct_password_code;
      await email.sendEmail(user.rows[0].TX_USER_EMAIL, subject, message);


      res.status(200).json({ message: "Reset code is sent to your email address", code: true })
    }
    res.status(400).json({ message: "no user found under this email address", code: false })


  } catch (err) {
    res.status(400).json({ message: "An error occured", code: false })
    console.log(err)
  }
})

router.post("/reset", async (req, res) => {
  try {
    const data = req.body; 
    const request = await pool.query('SELECT * FROM "CT_PASSWORD_CHANGE" WHERE "ct_password_code" = $1', [
      data.code
    ]);
    if (request.rows.length === 0) {
      return res.status(400).json("Wrong Reset Code");
    }
    const user = await pool.query('SELECT * FROM "T_USER" WHERE "ID_USER_UUID" = $1', [
      request.rows[0].ct_userid
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json("User does not exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(data.password, salt);

    let newUser = await pool.query(
      'UPDATE   "T_USER" SET  "TX_USER_PASSWORD" = $1  WHERE "ID_USER_UUID" = $2', [
      bcryptPassword, request.rows[0].ct_userid
    ]);

    const requestq = await pool.query('DELETE  FROM "CT_PASSWORD_CHANGE" WHERE "ct_userid" = $1', [
      user.rows[0].ID_USER_UUID
    ]);
    const jwtToken = jwtGenerator(user.rows[0].ID_USER_UUID);
    res.status(200).json({ jwtToken: jwtToken, isCounsellor: user.rows[0].IS_COUNSELLOR, userID: user.rows[0].ID_USER_UUID });

  } catch (err) {
    res.status(400).json("An error occured");
  }
})

module.exports = router;