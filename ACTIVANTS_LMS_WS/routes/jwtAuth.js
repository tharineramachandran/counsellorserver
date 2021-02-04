const email = require("./../functions/email");
const router = require("express").Router();
const pool = require("../database/Db_Connection");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validateInfo");
const authorization = require("../middleware/authorization");
const { baseURLAPI, baseURL } = require("../Global");
const CLIENT_HOME_PAGE_URL = baseURL;
const CLIENT_BASEURL_PAGE_URL = baseURLAPI;
const keys = require('../config/keys');
const Global = require("../../ATIVANTS_LMS_COUNSELLOR_WEBSITE/src/Global");
//registering
router.post("/register", validInfo, async (req, res) => {
  const { TX_USER_NAME, TX_USER_EMAIL, TX_USER_PASSWORD } = req.body;

  try {
    const user = await pool.query(
      'SELECT * FROM "T_USER" WHERE "TX_USER_EMAIL" = $1',
      [TX_USER_EMAIL.toLowerCase()]
    );
    if (user.rows.length !== 0) {
      return res.status(401).json("Email already exist!");
    }
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(TX_USER_PASSWORD, salt);
    var datetime = new Date();

    let newUser = await pool.query(
      'INSERT INTO "T_USER" ("TX_USER_NAME", "TX_USER_EMAIL","TX_USER_PASSWORD","TX_VERIFICATION_STATUS","DT_DATE_CREATED","IN_ACTIVE","IS_COUNSELLOR","TX_IS_COMPLETED") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [
        TX_USER_NAME,
        TX_USER_EMAIL.toLowerCase(),
        bcryptPassword,
        0,
        datetime.toISOString().slice(0, 10),
        0,
        0,
        0,
      ]
    );
    var message =
      "Dear user, please click on the following link to confirm your email address :  " +
      CLIENT_BASEURL_PAGE_URL +
      "/emailVerify/" +
      TX_USER_EMAIL;

    await email.sendEmail(TX_USER_EMAIL, "verify email address", message, 0, 0);
    const jwtToken = jwtGenerator(newUser.rows[0].ID_USER_UUID);
    res.json({ jwtToken: jwtToken, user: newUser.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

//login route

router.post("/login", validInfo, async (req, res) => {
  try {
    const { TX_USER_EMAIL, TX_USER_PASSWORD } = req.body;

    const user = await pool.query(
      'SELECT "TX_USER_NAME","ID_USER_UUID" ,  "TX_USER_EMAIL","TX_USER_PASSWORD","TX_VERIFICATION_STATUS","DT_DATE_CREATED","IN_ACTIVE","IS_COUNSELLOR","TX_IS_COMPLETED" FROM "T_USER" WHERE "TX_USER_EMAIL" = $1',
      [TX_USER_EMAIL.toLowerCase()]
    );

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }
    const validPassword = await bcrypt.compare(
      TX_USER_PASSWORD,
      user.rows[0].TX_USER_PASSWORD
    );
    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }
    const jwtToken = jwtGenerator(user.rows[0].ID_USER_UUID);
    res.json({ jwtToken, user: user.rows[0] });
  } catch (error) {
    console.log(error);
    return res.status(401).json("Password or Email is incorrect");
  }
});

router.get("/verify", authorization, async (req, res) => {
  try {
    res.json({ message: true, userID: req.user });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
//registering
router.post("/counsellor/register", validInfo, async (req, res) => {
  const { TX_USER_NAME, TX_USER_EMAIL, TX_USER_PASSWORD } = req.body;

  try {
    const user = await pool.query(
      'SELECT * FROM "T_USER" WHERE "TX_USER_EMAIL" = $1',
      [TX_USER_EMAIL.toLowerCase()]
    );

    if (user.rows.length !== 0) {
      return res.status(401).json("Email already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(TX_USER_PASSWORD, salt);

    var datetime = new Date();

    let newUser = await pool.query(
      'INSERT INTO "T_USER" ("TX_USER_NAME","TX_USER_EMAIL","TX_USER_PASSWORD","TX_VERIFICATION_STATUS","DT_DATE_CREATED","IN_ACTIVE","IS_COUNSELLOR","TX_IS_COMPLETED","TX_PICTURE") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [
        TX_USER_NAME,
        TX_USER_EMAIL.toLowerCase(),
        bcryptPassword,
        0,
        datetime.toISOString().slice(0, 10),
        0,
        1,
        0,Global.image.adminpic
      ]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].ID_USER_UUID);
    await email.sendEmail(
      newUser.rows[0].TX_USER_EMAIL,
      "Confirm your email",
      "We are here to help you find the best counsellor.to start messaging your consellor and book an appointment please verify your email address by clicking on this link. Link : " +
        CLIENT_BASEURL_PAGE_URL +
        "/emailVerify/" +
        newUser.rows[0].TX_USER_EMAIL,
      0,
      0
    );
    res.json({ jwtToken, user: newUser.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});



router.post("/admin/delete", authorization,  async (req, res) => {
  console.log(req.user)
  var deleteusers=req.body;
  const adminUser = await pool.query(
    'SELECT "IS_COUNSELLOR" FROM "T_USER" WHERE "ID_USER_UUID" = $1',
    [req.user]
  );  
  if(adminUser.rows[0].IS_COUNSELLOR ==4) {
    deleteusers.forEach(element => {
      try {
        if(element.toLowerCase() != "lmsadmstr2@gmail.com"){ const user =   pool.query(
          'DELETE FROM "T_USER" WHERE "TX_USER_EMAIL" = $1',
          [element.toLowerCase()]
        );}
       
      }catch  (err) {
        console.log(err);}
});

  }
  res.json("success");
});

//registering
router.post("/admin/register", authorization,  async (req, res) => {
  const { TX_USER_NAME, TX_USER_EMAIL, TX_USER_PASSWORD } = req.body;
console.log(req.user)
const adminUser = await pool.query(
  'SELECT "IS_COUNSELLOR" FROM "T_USER" WHERE "ID_USER_UUID" = $1',
  [req.user]
);  
if(adminUser.rows[0].IS_COUNSELLOR ==4) { 
  try {
    const user = await pool.query(
      'SELECT * FROM "T_USER" WHERE "TX_USER_EMAIL" = $1',
      [TX_USER_EMAIL.toLowerCase()]
    );

    if (user.rows.length !== 0) {
      return res.status(401).json("Email already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(TX_USER_PASSWORD, salt);

    var datetime = new Date();

    let newUser = await pool.query(
      'INSERT INTO "T_USER" ("TX_USER_NAME","TX_USER_EMAIL","TX_USER_PASSWORD","TX_VERIFICATION_STATUS","DT_DATE_CREATED","IN_ACTIVE","IS_COUNSELLOR","TX_IS_COMPLETED") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [
        TX_USER_NAME,
        TX_USER_EMAIL.toLowerCase(),
        bcryptPassword,
        0,
        datetime.toISOString().slice(0, 10),
        0,
      4,
        0,
      ]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].ID_USER_UUID);
    await email.sendEmail(
      newUser.rows[0].TX_USER_EMAIL,
      "Confirm your email",
      "We are here to help you find the best counsellor.to start messaging your consellor and book an appointment please verify your email address by clicking on this link. Link : " +
        CLIENT_BASEURL_PAGE_URL +
        "/emailVerify/" +
        newUser.rows[0].TX_USER_EMAIL,
      0,
      0
    );
    res.json({ jwtToken, user: newUser.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }} res.status(400).send("Invalid User");
});





module.exports = router;
