const router = require('express').Router();
const pool = require("../database/Db_Connection")
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validateInfo");
const authorization = require("../middleware/authorization");


//registering
router.post("/register", validInfo, async (req, res) => {
  const { TX_USER_NAME, TX_USER_EMAIL, TX_USER_PASSWORD } = req.body;

  try {
    const user = await pool.query('SELECT * FROM "T_USER" WHERE "TX_USER_EMAIL" = $1', [
      TX_USER_EMAIL
    ]);
     
    if (user.rows.length !== 0) { 
      return res.status(401).json("Email already exist!");
    }

    const salt = await bcrypt.genSalt(10);  
    const bcryptPassword = await bcrypt.hash(TX_USER_PASSWORD, salt);
    var datetime = new Date();

    let newUser = await pool.query(
      'INSERT INTO "T_USER" ("TX_USER_NAME","TX_USER_EMAIL","TX_USER_PASSWORD","TX_VERIFICATION_STATUS","DT_DATE_CREATED","IN_ACTIVE","IS_COUNSELLOR") VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [TX_USER_NAME, TX_USER_EMAIL, bcryptPassword, 0, datetime.toISOString().slice(0, 10), 0,0]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].ID_USER_UUID);
    res.json({ jwtToken : jwtToken,   isCounsellor :  newUser.rows[0].IS_COUNSELLOR,      userID    :newUser.rows[0].ID_USER_UUID                            });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


//login route

router.post("/login", validInfo, async (req, res) => {
  try {

    const { TX_USER_EMAIL, TX_USER_PASSWORD } = req.body;
    const user = await pool.query('SELECT * FROM "T_USER" WHERE "TX_USER_EMAIL" = $1',
      [TX_USER_EMAIL]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect")
    }

    const validPassword = await bcrypt.compare(TX_USER_PASSWORD, user.rows[0].TX_USER_PASSWORD);

    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }

    const jwtToken = jwtGenerator(user.rows[0].ID_USER_UUID);
    res.json({ jwtToken, isCounsellor : user.rows[0].IS_COUNSELLOR , userID : user.rows[0].ID_USER_UUID     });


  } catch (error) {
    res.status(500).send("Server Error");
  }
})


router.get("/verify", authorization, async (req, res) => {
  try {
    res.json({message : true , userID : req.user} );
  } 
  catch (error) {
    res.status(500).send("Server Error");
  }
})


//registering
router.post("/counsellor/register", validInfo, async (req, res) => {
  const { TX_USER_NAME, TX_USER_EMAIL, TX_USER_PASSWORD } = req.body;

  try {
    const user = await pool.query('SELECT * FROM "T_USER" WHERE "TX_USER_EMAIL" = $1', [
      TX_USER_EMAIL
    ]);
    
    if (user.rows.length !== 0) { 
      return res.status(401).json("Email already exist!");
    }

    const salt = await bcrypt.genSalt(10);  
    const bcryptPassword = await bcrypt.hash(TX_USER_PASSWORD, salt);

    var datetime = new Date();

    let newUser = await pool.query(
      'INSERT INTO "T_USER" ("TX_USER_NAME","TX_USER_EMAIL","TX_USER_PASSWORD","TX_VERIFICATION_STATUS","DT_DATE_CREATED","IN_ACTIVE","IS_COUNSELLOR") VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [TX_USER_NAME, TX_USER_EMAIL, bcryptPassword, 0, datetime.toISOString().slice(0, 10), 0,1]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].ID_USER_UUID);
    
    res.json({ jwtToken, isCounsellor : newUser.rows[0].IS_COUNSELLOR , userID : newUser.rows[0].ID_USER_UUID     });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});
module.exports = router;
