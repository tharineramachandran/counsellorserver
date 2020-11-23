const router = require("express").Router();
const pool = require("../database/Db_Connection");
const authorization = require("../middleware/authorization");
const { baseURLAPI, baseURL } = require('../Global');
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const emailFun = require('../functions/email');



router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
 
    const updateRequest = await pool.query('UPDATE "T_USER" SET "TX_VERIFICATION_STATUS" = $1 WHERE "TX_USER_EMAIL" = $2',
    [1, email]);
       

    emailFun.sendEmail(email,"email address verified","Dear user,this is confirmation email that  you have verified your email address   "  ) ;
      res.redirect(baseURL+'/?color=green&header=Success&content=Successfully+verified+email+address');    

  } catch (err) {
    res.redirect(baseURL+'/?color=red&header=Error&content=unsuccessful+to+verified+email+address');
    console.log(err)
  }
})
 

module.exports = router;