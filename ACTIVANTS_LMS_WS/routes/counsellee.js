
const router = require("express").Router();
const pool = require("../database/Db_Connection");
const authorization = require("../middleware/authorization");
const getName = require("../functions/names");
const awsS3 = require("../functions/awsS3");
const createCounselleeValidation = require("../middleware/createCounselleeValidation");
 
//create counsellee
router.post("/createCounsellee", createCounselleeValidation, async (req, res) => {

    try {
        var { COUNSELLOR_FIRST_NAME,
            COUNSELLOR_LAST_NAME,
            COUNSELLOR_EMAIL,COUNSELLOR_FILES,
            COUNSELLOR_PHONE_NUMBER,
            COUNSELLOR_COUNTRY_CODE,
            COUNSELLOR_COUNSELLING_SUBJECT_ID,
            COUNSELLOR_HOURLY_RATE,
            COUNSELLOR_QUALIFICATION_INSTITUTE,
            COUNSELLOR_COUNSELLING_DETAILS,
            COUNSELLOR_PHOTO, COUNSELLOR_HEADLINE, COUNSELLOR_ABOUT_DESCRIPTION,
            COUNSELLOR_VIDEO_URL,
            COUNSELLOR_TIME_ZONE_CODE, COUNSELLOR_AVAILABILITY_MONDAY, COUNSELLOR_AVAILABILITY_TUESDAY, COUNSELLOR_AVAILABILITY_WEDNESDAY,
            COUNSELLOR_AVAILABILITY_THURSDAY, COUNSELLOR_AVAILABILITY_FRIDAY, COUNSELLOR_AVAILABILITY_SATURDAY,
            COUNSELLOR_DOCUMENT_IMAGE, } =   req.body.formData      ;
        const COUNSELLORID = req.body.COUNSELLORID;
     
        const user = await pool.query('SELECT * FROM "T_USER" WHERE "ID_USER_UUID" = $1', [
            COUNSELLORID]);


            console.log(user.rows);
       
        if (user.rows.length == 1 ) {

            const newCounsellorDetails = await pool.query(
                'INSERT INTO "CT_COUNSELLEE_DETAILS" ("CT_EMAIL", "CT_FIRST_NAME", "CT_LAST_NAME", "CT_PHONE_NUMBER", "CT_COUNTRY_CODE", "CT_COUNSELLEE_ID") VALUES($1,$2,$3,$4,$5,$6 ) RETURNING *',
                [COUNSELLOR_EMAIL, COUNSELLOR_FIRST_NAME, COUNSELLOR_LAST_NAME, COUNSELLOR_PHONE_NUMBER, COUNSELLOR_COUNTRY_CODE , COUNSELLORID]);

            const newCounsellorIntroductionDetails = await pool.query(
                'INSERT INTO "CT_COUNSELLEE_INTRODUCTION" (   ct_counsellee_about_description, ct_counsellee_photo, ct_counsellee_headline, ct_counsellee_video_url, ct_counsellee_id) VALUES($1,$2,$3,$4,$5) RETURNING *',
                [COUNSELLOR_ABOUT_DESCRIPTION, COUNSELLOR_PHOTO, COUNSELLOR_HEADLINE, COUNSELLOR_VIDEO_URL, COUNSELLORID]);

            if (COUNSELLOR_QUALIFICATION_INSTITUTE.length > 0) {

                COUNSELLOR_QUALIFICATION_INSTITUTE.forEach(insertConsellorQualInst);
                function insertConsellorQualInst(item, index) {
                    pool.query(
                        'INSERT INTO "CT_COUNSELLEE_QUALIFICATION_INSTITUTE" (    ct_institute_code, ct_qualification_code, ct_counsellee_id ) VALUES($1,$2,$3) RETURNING *',
                        [item.CT_INSTITUTE_CODE, item.CT_QUALIFICATION_CODE, COUNSELLORID]);
                }

            }

            if (COUNSELLOR_COUNSELLING_DETAILS.length > 0) {

                COUNSELLOR_COUNSELLING_DETAILS.forEach(insertConsellingDetails);
                function insertConsellingDetails(item, index) {
                    pool.query(
                        'INSERT INTO "CT_COUNSELLEE_COUNSELLING_DETAILS" (    ct_counselling_level_code, ct_counselling_subject_code,ct_counsellee_average_hourly_rate, ct_counsellee_id ) VALUES($1,$2,$3,$4) RETURNING *',
                        [item.CT_COUNSELLING_LEVEL_CODE, item.CT_COUNSELLING_SUBJECT_CODE, item.COUNSELLOR_HOURLY_RATE, COUNSELLORID]);
                }
            } 

          res.status(200).json("success");
       }

           res.status(400).json([{ error: "User not found ", message: "User not found" }]);

      
    } catch (error) {
        console.error(["api consellee add",error.message]);
        res.status(400).json([{ error: "Duplicate account  found ", message: "Duplicate account  found" }]);
    }
})

 
module.exports = router;

