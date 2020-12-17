const router = require('express').Router();
const pool = require("../database/Db_Connection")
const authorization = require("../middleware/authorization");

const getName = require("../functions/names");
const { baseURLAPI, baseURL } = require('../Global');


router.post("/updatePref/:id", authorization, async (req, res) => {
    var { ct_session_scheduling,
        ct_general_reminders, ct_product_update,
        ct_newsletter, ct_qna, ct_sms_sessions_messages,
        ct_product_improvents
    } = req.body;
    var id = req.params.id;
 
    try {

        var user = await await pool.query('SELECT * FROM "CT_NOTIFICATION_PREF" where "ct_user_id" = $1   ', [parseInt(id)]);

        if (user.rowCount > 0) {
            await pool.query(
                'UPDATE   "CT_NOTIFICATION_PREF" SET  "ct_session_scheduling"  = $2, "ct_general_reminders"  = $3, "ct_product_update" = $4, 	"ct_newsletter"  = $5, "ct_qna"  = $6, "ct_sms_sessions_messages" = $7, "ct_product_improvents"  = $8   WHERE "ct_user_id" = $1', [
                parseInt(id), ct_session_scheduling, ct_general_reminders, ct_product_update, ct_newsletter, ct_qna, ct_sms_sessions_messages,
                ct_product_improvents])
        } else {
            await pool.query(
                'INSERT INTO "CT_NOTIFICATION_PREF" (   ct_user_id, ct_session_scheduling, ct_general_reminders, ct_product_update, ct_newsletter, ct_qna, ct_sms_sessions_messages, ct_product_improvents ) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
                [parseInt(id), ct_session_scheduling, ct_general_reminders, ct_product_update, ct_newsletter, ct_qna, ct_sms_sessions_messages,
                    ct_product_improvents]);
        }

        res.status(200).json("success");

    } catch (error) {
        console.error(["api consellee update", error.message]);
        res.status(400).json([{ error: "An error occurred ", message: "An error occurred" }]);
    }
})

router.get("/getPref/:id", authorization, async (req, res) => {
    
    var id = req.params.id;
 
    try {

        var user = await await pool.query('SELECT * FROM "CT_NOTIFICATION_PREF" where "ct_user_id" = $1 ', [parseInt(id)]);

        if (user.rowCount > 0) {
            res.status(200).json({user :user.rows[0]});    
        } else {
        res.status(200).json( {user :{
            
            ct_session_scheduling : false ,
            ct_general_reminders : false ,
            ct_product_update : false ,
            ct_newsletter : false ,
            ct_qna : false ,
            ct_sms_sessions_messages : false ,
            ct_product_improvents  : false 

        } } );    
        }
 

    } catch (error) {
        console.error(["api consellee update", error.message]);
        res.status(400).json([{ error: "An error occurred ", message: "An error occurred" }]);
    }
})

module.exports = router;