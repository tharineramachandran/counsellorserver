
const router = require("express").Router();
const pool = require("../database/Db_Connection");
const authorization = require("../middleware/authorization");
const checkCounselleeUpdate = require("../middleware/checkCounselleeUpdate");
const getName = require("../functions/names");
const awsS3 = require("../functions/awsS3");
const createCounselleeValidation = require("../middleware/createCounselleeValidation");

//create counsellee
router.post("/createCounsellee", createCounselleeValidation, async (req, res) => {

    try {
        var { COUNSELLOR_FIRST_NAME,
            COUNSELLOR_LAST_NAME,
            COUNSELLOR_EMAIL, COUNSELLOR_FILES,
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
            COUNSELLOR_DOCUMENT_IMAGE, } = req.body.formData;
        const COUNSELLORID = req.body.COUNSELLORID;

        const user = await pool.query('SELECT * FROM "T_USER" WHERE "ID_USER_UUID" = $1', [
            COUNSELLORID]);

        console.log(user.rows);

        if (user.rows.length == 1) {

            const newCounsellorDetails = await pool.query(
                'INSERT INTO "CT_COUNSELLEE_DETAILS" ("CT_EMAIL", "CT_FIRST_NAME", "CT_LAST_NAME", "CT_PHONE_NUMBER", "CT_COUNTRY_CODE", "CT_COUNSELLEE_ID") VALUES($1,$2,$3,$4,$5,$6 ) RETURNING *',
                [COUNSELLOR_EMAIL, COUNSELLOR_FIRST_NAME, COUNSELLOR_LAST_NAME, COUNSELLOR_PHONE_NUMBER, COUNSELLOR_COUNTRY_CODE, COUNSELLORID]);

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
            let newUser = pool.query(
                'UPDATE   "T_USER" SET  "TX_IS_COMPLETED" = $1 , "TX_PICTURE" = $2  WHERE "ID_USER_UUID" = $3', [
                1, COUNSELLOR_PHOTO, COUNSELLORID
            ])

            res.status(200).json("success");
        }

        res.status(400).json([{ error: "User not found ", message: "User not found" }]);


    } catch (error) {
        console.error(["api consellee add", error.message]);
        res.status(400).json([{ error: "Duplicate account  found ", message: "Duplicate account  found" }]);
    }
})

async function checkEmailValid(userEmail, COUNSELLORID) {
    const user = await pool.query('SELECT * FROM "T_USER" WHERE "TX_USER_EMAIL" = $1', [
        userEmail]);
    console.log(user);
    if (user.rowCount > 0) {

        if (parseInt(user.rows[0].ID_USER_UUID) == parseInt(COUNSELLORID)) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}

//update counsellee
router.post("/UpdateDetails", checkCounselleeUpdate, async (req, res) => {
    var { COUNSELLOR_FIRST_NAME,
        COUNSELLOR_LAST_NAME,
        COUNSELLOR_EMAIL,
        COUNSELLOR_PHONE_NUMBER,
        COUNSELLOR_COUNTRY_CODE } = req.body.formData;
    const COUNSELLORID = req.body.COUNSELLORID;


    if (await checkEmailValid(COUNSELLOR_EMAIL, COUNSELLORID)) {
        res.status(400).json([{ error: "COUNSELLOR_EMAIL", message: "this email is already used by another user" }]);
    } else {

        try {

            let newUser = pool.query(
                'UPDATE   "CT_COUNSELLEE_DETAILS" SET  "CT_EMAIL" = $1 , "CT_FIRST_NAME" = $2   , "CT_LAST_NAME" = $3   , "CT_PHONE_NUMBER" = $4    , "CT_COUNTRY_CODE" = $5 WHERE "CT_COUNSELLEE_ID" = $6', [
                COUNSELLOR_EMAIL, COUNSELLOR_FIRST_NAME, COUNSELLOR_LAST_NAME, COUNSELLOR_PHONE_NUMBER, COUNSELLOR_COUNTRY_CODE, COUNSELLORID])

            let UPDATEUser = pool.query(
                'UPDATE   "T_USER" SET  "TX_USER_EMAIL" = $1   WHERE "ID_USER_UUID" = $2', [
                COUNSELLOR_EMAIL, COUNSELLORID])

            res.status(200).json("success");

        } catch (error) {
            console.error(["api consellee update", error.message]);
            res.status(400).json([{ error: "An error occurred ", message: "An error occurred" }]);
        }
    }
})




//update counsellee
router.post("/UpdatePhoto", authorization, async (req, res) => {
    var { COUNSELLOR_PHOTO } = req.body.formData;
    const COUNSELLORID = req.body.COUNSELLORID;
    try {

        let newUser = pool.query(
            'UPDATE   "T_USER" SET  "TX_PICTURE" = $1   WHERE "ID_USER_UUID" = $2', [
            COUNSELLOR_PHOTO, COUNSELLORID])

        let User = pool.query(
            'UPDATE   "CT_COUNSELLEE_INTRODUCTION" SET  "ct_counsellee_photo" = $1   WHERE "ct_counsellee_id" = $2', [
            COUNSELLOR_PHOTO, COUNSELLORID])

        res.status(200).json("success");

    } catch (error) {
        console.error(["api consellee update", error.message]);
        res.status(400).json([{ error: "An error occurred ", message: "An error occurred" }]);

    }
})


//update counsellee
router.post("/UpdateIntroduction", authorization, async (req, res) => {
    var { COUNSELLOR_HEADLINE, COUNSELLOR_ABOUT_DESCRIPTION } = req.body.formData;
    const COUNSELLORID = req.body.COUNSELLORID;
    var errorlist = []

    if (!(COUNSELLOR_HEADLINE.length < 50 && COUNSELLOR_HEADLINE.length > 0)) {
        errorlist.push({ error: "COUNSELLOR_HEADLINE ", message: "Headlines should be atleast 50 characters" })

    }
    if (!(COUNSELLOR_ABOUT_DESCRIPTION.length < 50 && COUNSELLOR_ABOUT_DESCRIPTION.length > 0)) {
        errorlist.push({ error: "COUNSELLOR_HEADLINE ", message: "Description should be atleast 50 characters" })

    }
    if (errorlist.length > 0) {
        res.status(400).json(errorlist);
    } else {
        try {

            let User = pool.query(
                'UPDATE   "CT_COUNSELLEE_INTRODUCTION" SET  "ct_counsellee_headline" = $1 ,"ct_counsellee_about_description" = $2   WHERE "ct_counsellee_id" = $3', [
                COUNSELLOR_HEADLINE, COUNSELLOR_ABOUT_DESCRIPTION, COUNSELLORID])
            res.status(200).json("success");

        } catch (error) {
            console.error(["api consellee update", error.message]);
            res.status(400).json([{ error: "An error occurred ", message: "An error occurred" }]);

        }
    }
})

router.get("/introduction/:id", authorization, async (req, res) => {

    try {
        const COUNSELLEEID = req.params.id;

        if (COUNSELLEEID) {

            const newCounsellorName = await pool.query(
                'SELECT "CT_FIRST_NAME" , "CT_LAST_NAME"  FROM "CT_COUNSELLEE_DETAILS" WHERE "CT_COUNSELLEE_ID" = $1',
                [COUNSELLEEID]);
            const newCounsellorIntro = await pool.query(
                'SELECT * FROM "CT_COUNSELLEE_INTRODUCTION" WHERE "ct_counsellee_id" = $1',
                [COUNSELLEEID]);

            res.status(200).json({
                details: newCounsellorName.rows[0],
                intro: newCounsellorIntro.rows[0]
            });
        }
        res.status(400).json([{ error: "User not found ", message: "User not found" }]);
    } catch (error) {
        console.error(["api consellee add", error.message]);
        res.status(400).json([{ error: error.message, message: "an error occurred" }]);
    }
})

router.get("/profilePicture/:id", authorization, async (req, res) => {

    try {
        const COUNSELLEEID = req.params.id;
        if (COUNSELLEEID) {
            const newCounsellorDetails = await pool.query(
                'SELECT "TX_PICTURE" FROM "T_USER" WHERE "ID_USER_UUID" = $1',
                [parseInt(COUNSELLEEID)]);
            res.status(200).json({ COUNSELLOR_PHOTO: newCounsellorDetails.rows[0].TX_PICTURE });
        }
        res.status(400).json([{ error: "User not found ", message: "User not found" }]);

    } catch (error) {
        console.error(["api consellee add", error.message]);
        res.status(400).json([{ error: error.message, message: "an error occurred" }]);
    }
})


router.get("/info/:id", authorization, async (req, res) => {

    try {
        
        const COUNSELLEEID = req.params.id;


        if (COUNSELLEEID) {

            const newCounsellorDetails = await pool.query(
                'SELECT * FROM "CT_COUNSELLEE_DETAILS" WHERE "CT_COUNSELLEE_ID" = $1',
                [COUNSELLEEID]);

            const newCounsellorIntroductionDetails = await pool.query(
                'SELECT * FROM "CT_COUNSELLEE_INTRODUCTION" WHERE "ct_counsellee_id" = $1   ',
                [COUNSELLEEID]);

            const insertConsellorQualInst = await pool.query(
                'SELECT * FROM "CT_COUNSELLEE_QUALIFICATION_INSTITUTE" WHERE "ct_counsellee_id" = $1   ',
                [COUNSELLEEID]);

            res.status(200).json({
                Details: newCounsellorDetails.rows, Introduction: newCounsellorIntroductionDetails.rows,

                Institution: insertConsellorQualInst
            });
        }

        res.status(400).json([{ error: "User not found ", message: "User not found" }]);

    } catch (error) {
        console.error(["api consellee select counsellee ", error.message]);
        res.status(400).json([{ error: error.message, message: "an error occurred" }]);
    }
})
module.exports = router;

