
const router = require("express").Router();
const pool = require("../database/Db_Connection");
const authorization = require("../middleware/authorization");

const checkCounsellorUpdate = require("../middleware/checkCounsellorUpdate");

const getName = require("../functions/names");
const awsS3 = require("../functions/awsS3");
const createCounsellorValidation = require("../middleware/createCounsellorValidation");

router.get("/GetCounsellorDetails/:id", async (req, res) => {
 var id=  req.params.id; 
 console.log( parseInt(id)) ;
    try { 
        var user_fav =[];
        if(   Number.isInteger ( parseInt(id))    ){ 
            user_fav = await pool.query('SELECT  * FROM "T_USER_FAVORITES" WHERE "ct_user_id" = $1', [parseInt(id)]);
         
        } 

        var details = [];
        var final_details = [];

        const query = await pool.query('SELECT * FROM "CT_COUNSELLOR_DETAILS" ');

        for (let i = 0; i < query.rowCount; i++) {

            details.push(query.rows[i].CT_COUNSELLOR_ID);
        }

        for (let i = 0; i < details.length; i++) {
            var item = details[i];

            var counsellor_details = await pool.query('SELECT * FROM "CT_COUNSELLOR_DETAILS" where "CT_COUNSELLOR_ID" = $1', [item]);
            var counsellor_review = await pool.query('SELECT  "CT_COUNSELLOR_REVIEW"."ct_request_id",       "CT_COUNSELLOR_REVIEW"."id", "CT_COUNSELLOR_REVIEW"."ct_counsellor_review","CT_COUNSELLOR_REVIEW"."ct_counsellor_stars", "CT_COUNSELLOR_REVIEW"."ct_counsellor_date","CT_COUNSELLOR_REVIEW"."ct_counsellor_user_id" ,"T_USER"."TX_USER_NAME" ,"T_USER"."TX_PICTURE"         FROM public."CT_COUNSELLOR_REVIEW" INNER JOIN public."T_USER" ON  CAST("CT_COUNSELLOR_REVIEW"."ct_counsellor_user_id" AS INTEGER) = "T_USER"."ID_USER_UUID" WHERE  "CT_COUNSELLOR_REVIEW"."ct_counsellor_id" = $1', [item]);

            var counselling_details = await pool.query('SELECT * FROM "CT_COUNSELLOR_COUNSELLING_DETAILS" where "ct_counsellor_id" = $1', [item]);
            var counselling_introduction = await pool.query('SELECT * FROM "CT_COUNSELLOR_INTRODUCTION" where "ct_counsellor_id" = $1', [item]);

            var counselling_monday = await pool.query('SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_MONDAY" where "ct_counsellor_id" = $1', [item]);
            var counselling_tuesday = await pool.query('SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_TUESDAY" where "ct_counsellor_id" = $1', [item]);
            var counselling_wednesday = await pool.query('SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_WEDNESDAY" where "ct_counsellor_id" = $1', [item]);
            var counselling_thursday = await pool.query('SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_THURSDAY" where "ct_counsellor_id" = $1', [item]);
            var counselling_friday = await pool.query('SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_FRIDAY" where "ct_counsellor_id" = $1', [item]);
            var counselling_saturday = await pool.query('SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_SATURDAY" where "ct_counsellor_id" = $1', [item]);

            var counselling_education = await pool.query('SELECT * FROM "CT_COUNSELLOR_QUALIFICATION_INSTITUTE" where "ct_counsellor_id" = $1', [item]);

            var counselling_edu_values = [];


            var counselling_total_review = 0;
            for (let x = 0; x < counsellor_review.rowCount; x++) {

                counselling_total_review += parseInt(counsellor_review.rows[x].ct_counsellor_stars);

            }

            var counselling_average_review = counselling_total_review / counsellor_review.rowCount;


            for (let x = 0; x < counselling_education.rowCount; x++) {

                var instituteName = await getName.getInstituteName(counselling_education.rows[x].ct_institute_code);
                counselling_education.rows[x].ct_institute_name = instituteName;

                var qualificationName = await getName.getQualificationsName(counselling_education.rows[x].ct_qualification_code);
                counselling_education.rows[x].ct_qualification_name = qualificationName;

                counselling_edu_values.push(counselling_education.rows[x]);
            }

            var counselling_details_values = [];
            var counselling_total_price = 0;

            for (let x = 0; x < counselling_details.rowCount; x++) {

                var counsellingLevelName = await getName.getCounsellingLevelName(counselling_details.rows[x].ct_counselling_level_code);
                counselling_details.rows[x].ct_counselling_level_name = counsellingLevelName;
                var counsellingSubjectsName = await getName.getCounsellingSubjectsName(counselling_details.rows[x].ct_counselling_subject_code);
                counselling_details.rows[x].ct_counselling_subject_name = counsellingSubjectsName;
                counselling_details_values.push(counselling_details.rows[x]);

                counselling_total_price += parseInt(counselling_details.rows[x].ct_counsellor_hourly_rate);
            }

            var view_counsellor_review= []

 
            for (let x = 0; x < counsellor_review.rowCount; x++) {


                var review_request = await pool.query('SELECT * FROM "CT_COUNSELLOR_REQUESTS" where "id" = $1', [counsellor_review.rows[x].ct_request_id]);
               var counsellingLevelName = await getName.getCounsellingLevelName(review_request.rows[0].ct_counselling_level_code);
                counsellor_review.rows[x].ct_counselling_level_name = counsellingLevelName;
                var counsellingSubjectsName = await getName.getCounsellingSubjectsName(review_request.rows[0].ct_counselling_subject_code);
                counsellor_review.rows[x].ct_counselling_subject_name = counsellingSubjectsName;
                view_counsellor_review.push(counsellor_review.rows[x]);
 
            }


            var counselling_average_price = counselling_total_price / counselling_details.rowCount;
            var counselling_average_review = counselling_total_review / counsellor_review.rowCount;
            var FavisAvailable = false;
            var counsellor_detailsFav = [];
       
                if(user_fav.rowCount > 0){
                    var FavisAvailable = true;

                   
  console.log(user_fav.rows[0].ct_user_fav)
                    if ( user_fav.rows[0].ct_user_fav.includes( counsellor_details.rows[0].CT_COUNSELLOR_ID  ))
                    {counsellor_details.rows[0].FavisAvailable =1 ; 
                    } else { counsellor_details.rows[0].FavisAvailable = 0 ; }
                        
         
                  
                }
   


            var account = {
                counsellor_details: counsellor_details.rows,
                FavisAvailable :FavisAvailable , 
                counsellor_review: view_counsellor_review,
                counselling_details: counselling_details_values,
                counselling_introduction: counselling_introduction.rows,
                counselling_education: counselling_edu_values,
                counselling_monday: counselling_monday.rows, counselling_tuesday: counselling_tuesday.rows,
                counselling_wednesday: counselling_wednesday.rows, counselling_thursday: counselling_thursday.rows,
                counselling_friday: counselling_friday.rows, counselling_saturday: counselling_saturday.rows,
                counselling_average_review: Math.floor(counselling_average_review),
                counselling_average_price: Math.floor(counselling_average_price),
                counselling_total_review: counsellor_review.rowCount
            };

            final_details.push(account);
        }
        res.json({ counsellor: final_details });
    } catch (error) {
        console.log(error.message);
        res.status(400).json("Server Error");
    }
});

router.get("/introduction/:id", authorization, async (req, res) => {

    try {
        const COUNSELLEEID = req.params.id;

        if (COUNSELLEEID) {
            const newCounsellorName = await pool.query(
                'SELECT "CT_FIRST_NAME" , "CT_LAST_NAME"  FROM "CT_COUNSELLOR_DETAILS" WHERE "CT_COUNSELLOR_ID" = $1',
                [COUNSELLEEID]);
            const newCounsellorIntro = await pool.query(
                'SELECT * FROM "CT_COUNSELLOR_INTRODUCTION" WHERE "ct_counsellor_id" = $1',
                [COUNSELLEEID]);
            res.status(200).json({
                details: newCounsellorName.rows[0],
                intro: newCounsellorIntro.rows[0]
            });
        }
        res.status(400).json([{ error: "User not found ", message: "User not found" }]);

    } catch (error) {
        console.error(["api consellor  introduction ", error.message]);
        res.status(400).json([{ error: error.message, message: "an error occurred" }]);
    }
})



//update counsellee
router.post("/UpdateIntroduction", authorization, async (req, res) => {
    var { COUNSELLOR_HEADLINE, COUNSELLOR_ABOUT_DESCRIPTION, COUNSELLOR_VIDEO_URL } = req.body.formData;
    const COUNSELLORID = req.body.COUNSELLORID;
    var errorlist = []

    if (!(COUNSELLOR_HEADLINE.length < 50 && COUNSELLOR_HEADLINE.length > 0)) {
        errorlist.push({ error: "COUNSELLOR_HEADLINE", message: "Headlines should be atleast 50 characters" })

    }
    if (!(COUNSELLOR_ABOUT_DESCRIPTION.length < 150 && COUNSELLOR_ABOUT_DESCRIPTION.length > 0)) {
        errorlist.push({ error: "COUNSELLOR_HEADLINE", message: "Description should be atleast 150 characters" })

    }

    if (![COUNSELLOR_VIDEO_URL].every(Boolean)) {
        errorlist.push({ error: "COUNSELLOR_VIDEO_URL", message: "No video URL provided" });
    } else if (!is_url(COUNSELLOR_VIDEO_URL)) {
        errorlist.push({ error: "COUNSELLOR_VIDEO_URL", message: "Invalid URL provided" });
    } else if (!COUNSELLOR_VIDEO_URL.includes("youtube.com")) {
        errorlist.push({ error: "COUNSELLOR_VIDEO_URL", message: "Invalid Youtube URL provided" });
    }





    if (errorlist.length > 0) {
        res.status(400).json(errorlist);
    } else {
        try {

            let User = pool.query(
                'UPDATE   "CT_COUNSELLOR_INTRODUCTION" SET  "ct_counsellor_headline" = $1 ,"ct_counsellor_about_description" = $2 ,"ct_counsellor_video_url" = $3  WHERE "ct_counsellor_id" = $4', [
                COUNSELLOR_HEADLINE, COUNSELLOR_ABOUT_DESCRIPTION, COUNSELLOR_VIDEO_URL, COUNSELLORID])


            res.status(200).json("success");

        } catch (error) {
            console.error(["api consellee update", error.message]);
            res.status(400).json([{ error: "An error occurred ", message: "An error occurred" }]);

        }
    }
})



function is_url(str) {
    regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
        return true;
    }
    else {
        return false;
    }
}


//create counsellor
router.post("/createCounsellor", createCounsellorValidation, async (req, res) => {

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
        var uploadtoS3 = false;
        var filestring = [];

        for (i = 0; i < COUNSELLOR_FILES.length; i++) {
            var file = COUNSELLOR_FILES[i];
            file.name = COUNSELLORID + "-" + Math.floor(Math.random() * (1000000 - 1) + 1);;
            filestring.push(file.name);




        }



        if (user.rows.length == 1 && COUNSELLOR_FILES.length > 0) {
            uploadtoS3 = await awsS3.uploadtoS3(COUNSELLOR_FILES, "counsellorverifydocuments");

        } else { uploadtoS3 = true }

        if (user.rows.length == 1 && uploadtoS3) {


            const newCounsellorDetails = await pool.query(
                'INSERT INTO "CT_COUNSELLOR_DETAILS" ("CT_EMAIL", "CT_FIRST_NAME", "CT_LAST_NAME", "CT_PHONE_NUMBER", "CT_COUNTRY_CODE", "CT_COUNSELLOR_ID","CT_COUNSELLOR_VERIFY") VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',
                [COUNSELLOR_EMAIL, COUNSELLOR_FIRST_NAME, COUNSELLOR_LAST_NAME, COUNSELLOR_PHONE_NUMBER, COUNSELLOR_COUNTRY_CODE, COUNSELLORID, filestring.toString()]);

            const newCounsellorIntroductionDetails = await pool.query(
                'INSERT INTO "CT_COUNSELLOR_INTRODUCTION" (   ct_counsellor_about_description, ct_counsellor_photo, ct_counsellor_headline, ct_counsellor_video_url, ct_counsellor_id) VALUES($1,$2,$3,$4,$5) RETURNING *',
                [COUNSELLOR_ABOUT_DESCRIPTION, COUNSELLOR_PHOTO, COUNSELLOR_HEADLINE, COUNSELLOR_VIDEO_URL, COUNSELLORID]);

            if (COUNSELLOR_QUALIFICATION_INSTITUTE.length > 0) {

                COUNSELLOR_QUALIFICATION_INSTITUTE.forEach(insertConsellorQualInst);
                function insertConsellorQualInst(item, index) {
                    pool.query(
                        'INSERT INTO "CT_COUNSELLOR_QUALIFICATION_INSTITUTE" (    ct_institute_code, ct_qualification_code, ct_counsellor_id ) VALUES($1,$2,$3) RETURNING *',
                        [item.CT_INSTITUTE_CODE, item.CT_QUALIFICATION_CODE, COUNSELLORID]);
                }

            }

            if (COUNSELLOR_COUNSELLING_DETAILS.length > 0) {

                COUNSELLOR_COUNSELLING_DETAILS.forEach(insertConsellingDetails);
                function insertConsellingDetails(item, index) {
                    pool.query(
                        'INSERT INTO "CT_COUNSELLOR_COUNSELLING_DETAILS" (    ct_counselling_level_code, ct_counselling_subject_code,ct_counsellor_hourly_rate, ct_counsellor_id ) VALUES($1,$2,$3,$4) RETURNING *',
                        [item.CT_COUNSELLING_LEVEL_CODE, item.CT_COUNSELLING_SUBJECT_CODE, item.COUNSELLOR_HOURLY_RATE, COUNSELLORID]);
                }
            }
            if (COUNSELLOR_AVAILABILITY_MONDAY.length > 0) {

                COUNSELLOR_AVAILABILITY_MONDAY.forEach(insertConsellorMonday);

                function insertConsellorMonday(item, index) {

                    if (item.TO && item.FROM && COUNSELLOR_COUNTRY_CODE) {
                        pool.query(
                            'INSERT INTO "CT_COUNSELLOR_AVAILABILITY_MONDAY" (    ct_to, ct_from, ct_counsellor_id, ct_counsellor_timezone_code   ) VALUES($1,$2,$3,$4) RETURNING *',
                            [item.TO, item.FROM, COUNSELLORID, COUNSELLOR_COUNTRY_CODE]);
                    }
                }
            }

            if (COUNSELLOR_AVAILABILITY_TUESDAY.length > 0) {

                COUNSELLOR_AVAILABILITY_TUESDAY.forEach(insertConsellorTuesday);

                function insertConsellorTuesday(item, index) {

                    if (item.TO && item.FROM && COUNSELLOR_COUNTRY_CODE) {
                        pool.query(
                            'INSERT INTO "CT_COUNSELLOR_AVAILABILITY_TUESDAY" (    ct_to, ct_from, ct_counsellor_id, ct_counsellor_timezone_code   ) VALUES($1,$2,$3,$4) RETURNING *',
                            [item.TO, item.FROM, COUNSELLORID, COUNSELLOR_COUNTRY_CODE]);
                    }
                }
            }

            if (COUNSELLOR_AVAILABILITY_WEDNESDAY.length > 0) {

                COUNSELLOR_AVAILABILITY_WEDNESDAY.forEach(insertConsellorWednesday);

                function insertConsellorWednesday(item, index) {

                    if (item.TO && item.FROM && COUNSELLOR_COUNTRY_CODE) {
                        pool.query(
                            'INSERT INTO "CT_COUNSELLOR_AVAILABILITY_WEDNESDAY" (    ct_to, ct_from, ct_counsellor_id, ct_counsellor_timezone_code   ) VALUES($1,$2,$3,$4) RETURNING *',
                            [item.TO, item.FROM, COUNSELLORID, COUNSELLOR_COUNTRY_CODE]);
                    }
                }
            }
            if (COUNSELLOR_AVAILABILITY_THURSDAY.length > 0) {

                COUNSELLOR_AVAILABILITY_THURSDAY.forEach(insertConsellorThursday);

                function insertConsellorThursday(item, index) {

                    if (item.TO && item.FROM && COUNSELLOR_COUNTRY_CODE) {
                        pool.query(
                            'INSERT INTO "CT_COUNSELLOR_AVAILABILITY_THURSDAY" (    ct_to, ct_from, ct_counsellor_id, ct_counsellor_timezone_code   ) VALUES($1,$2,$3,$4) RETURNING *',
                            [item.TO, item.FROM, COUNSELLORID, COUNSELLOR_COUNTRY_CODE]);
                    }
                }
            }
            if (COUNSELLOR_AVAILABILITY_FRIDAY.length > 0) {

                COUNSELLOR_AVAILABILITY_FRIDAY.forEach(insertConsellorFriday);

                function insertConsellorFriday(item, index) {

                    if (item.TO && item.FROM && COUNSELLOR_COUNTRY_CODE) {

                        pool.query(
                            'INSERT INTO "CT_COUNSELLOR_AVAILABILITY_FRIDAY" (    ct_to, ct_from, ct_counsellor_id, ct_counsellor_timezone_code   ) VALUES($1,$2,$3,$4) RETURNING *',
                            [item.TO, item.FROM, COUNSELLORID, COUNSELLOR_COUNTRY_CODE]);
                    }
                }
            }
            if (COUNSELLOR_AVAILABILITY_SATURDAY.length > 0) {

                COUNSELLOR_AVAILABILITY_SATURDAY.forEach(insertConsellorSaturday);


                function insertConsellorSaturday(item, index) {
                    if (item.TO && item.FROM && COUNSELLOR_COUNTRY_CODE) {

                        pool.query(
                            'INSERT INTO "CT_COUNSELLOR_AVAILABILITY_SATURDAY" (    ct_to, ct_from, ct_counsellor_id, ct_counsellor_timezone_code   ) VALUES($1,$2,$3,$4) RETURNING *',
                            [item.TO, item.FROM, COUNSELLORID, COUNSELLOR_COUNTRY_CODE]);
                    }
                }
            }
            const updatedUser = pool.query(
                'UPDATE   "T_USER" SET  "TX_IS_COMPLETED" = $1 , "TX_PICTURE" = $2  WHERE "ID_USER_UUID" = $3', [
                1, COUNSELLOR_PHOTO, user.rows[0].ID_USER_UUID
            ])
            // res.status(400).json([{ error: "User not found ", message: "User not found" }]);
            res.status(200).json("success");
        }


        res.status(400).json([{ error: "User not found ", message: "User not found" }]);
    } catch (error) {
        console.error(error.message);
        res.status(400).json([{ error: "Duplicate account  found ", message: "Duplicate account  found" }]);
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
            'UPDATE   "CT_COUNSELLOR_INTRODUCTION" SET  "ct_counsellor_photo" = $1   WHERE "ct_counsellor_id" = $2', [
            COUNSELLOR_PHOTO, COUNSELLORID])

        res.status(200).json("success");

    } catch (error) {
        console.error(["api consellee update", error.message]);
        res.status(400).json([{ error: "An error occurred ", message: "An error occurred" }]);
    }
})

//get All counsellor
router.get("/form/list", async (req, res) => {
    try {
        const allCountries = await pool.query('SELECT * FROM "CT_COUNTRY"');
        const allInstitutes = await pool.query('SELECT * FROM "CT_INSTITUTE"');
        const allQualifications = await pool.query('SELECT * FROM "CT_QUALIFICATION"');
        const allCounsellingSubjects = await pool.query('select * from "CT_COUNSELLING_SUBJECT"');
        const allCounsellingLevel = await pool.query('select * from "CT_COUNSELLING_LEVEL"');
        res.json({
            COUNTRIES: allCountries.rows,
            INSTITUTES: allInstitutes.rows,
            QUALIFICATIONS: allQualifications.rows,
            COUNSELLING_SUBJECTS: allCounsellingSubjects.rows,
            COUNSELLING_LEVELS: allCounsellingLevel.rows
        })

    } catch (error) {
        console.log(error.message);
    }
})

//get All counsellor
router.get("/availableDates/:id", authorization, async (req, res) => {
    try {
        const COUNSELLORID = req.params.id;

        const CT_COUNSELLOR_AVAILABILITY_MONDAY = await pool.query(
            'SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_MONDAY" WHERE "ct_counsellor_id" = $1',
            [COUNSELLORID]);

        const CT_COUNSELLOR_AVAILABILITY_TUESDAY = await pool.query(
            'SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_TUESDAY" WHERE "ct_counsellor_id" = $1',
            [COUNSELLORID]);
        const CT_COUNSELLOR_AVAILABILITY_WEDNESDAY = await pool.query(
            'SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_WEDNESDAY" WHERE "ct_counsellor_id" = $1',
            [COUNSELLORID]);
        const CT_COUNSELLOR_AVAILABILITY_THURSDAY = await pool.query(
            'SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_THURSDAY" WHERE "ct_counsellor_id" = $1',
            [COUNSELLORID]);
        const CT_COUNSELLOR_AVAILABILITY_FRIDAY = await pool.query(
            'SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_FRIDAY" WHERE "ct_counsellor_id" = $1',
            [COUNSELLORID]);
        const CT_COUNSELLOR_AVAILABILITY_SATURDAY = await pool.query(
            'SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_SATURDAY" WHERE "ct_counsellor_id" = $1',
            [COUNSELLORID]);
        const COUNSELLOR_AVAILABILITY_MONDAY = await formatDates(CT_COUNSELLOR_AVAILABILITY_MONDAY.rows);
        const COUNSELLOR_AVAILABILITY_TUESDAY = await formatDates(CT_COUNSELLOR_AVAILABILITY_TUESDAY.rows);
        const COUNSELLOR_AVAILABILITY_WEDNESDAY = await formatDates(CT_COUNSELLOR_AVAILABILITY_WEDNESDAY.rows);
        const COUNSELLOR_AVAILABILITY_THURSDAY = await formatDates(CT_COUNSELLOR_AVAILABILITY_THURSDAY.rows);
        const COUNSELLOR_AVAILABILITY_FRIDAY = await formatDates(CT_COUNSELLOR_AVAILABILITY_FRIDAY.rows);
        const COUNSELLOR_AVAILABILITY_SATURDAY = await formatDates(CT_COUNSELLOR_AVAILABILITY_SATURDAY.rows);

        res.json({
            CT_COUNSELLOR_AVAILABILITY_MONDAY: COUNSELLOR_AVAILABILITY_MONDAY,
            CT_COUNSELLOR_AVAILABILITY_TUESDAY: COUNSELLOR_AVAILABILITY_TUESDAY,
            CT_COUNSELLOR_AVAILABILITY_WEDNESDAY: COUNSELLOR_AVAILABILITY_WEDNESDAY,
            CT_COUNSELLOR_AVAILABILITY_THURSDAY: COUNSELLOR_AVAILABILITY_THURSDAY,
            CT_COUNSELLOR_AVAILABILITY_FRIDAY: COUNSELLOR_AVAILABILITY_FRIDAY,
            CT_COUNSELLOR_AVAILABILITY_SATURDAY: COUNSELLOR_AVAILABILITY_SATURDAY
        })

    } catch (error) {
        console.log(error.message);
    }
})
function formatDates(dates) {
    var datesformat = [];

    if (dates.length > 0) {

        for (var i = 0; i < dates.length; i++) {

            datesformat.push({

                FROM: dates[i].ct_from, TO: dates[i].ct_to

            })
        }
        return datesformat;
    }
};





//update counsellee
router.post("/UpdateTimeTable", authorization, async (req, res) => {
    var { COUNSELLOR_COUNTRY_CODE } = req.body.formData;
    const COUNSELLORID = req.body.COUNSELLORID;
    const days = req.body.days;
    var COUNSELLOR_AVAILABILITY_MONDAY = days.Monday;
    var COUNSELLOR_AVAILABILITY_TUESDAY = days.Tuesday;
    var COUNSELLOR_AVAILABILITY_WEDNESDAY = days.Wednesday;
    var COUNSELLOR_AVAILABILITY_THURSDAY = days.Thursday;
    var COUNSELLOR_AVAILABILITY_FRIDAY = days.Friday;
    var COUNSELLOR_AVAILABILITY_SATURDAY = days.Saturday;

    try {
        await pool.query(
            'DELETE FROM "CT_COUNSELLOR_AVAILABILITY_MONDAY" WHERE "ct_counsellor_id" = $1',
            [COUNSELLORID]);

        await pool.query(
            'DELETE FROM "CT_COUNSELLOR_AVAILABILITY_TUESDAY" WHERE "ct_counsellor_id" = $1',
            [COUNSELLORID]);
        await pool.query(
            'DELETE  FROM "CT_COUNSELLOR_AVAILABILITY_WEDNESDAY" WHERE "ct_counsellor_id" = $1',
            [COUNSELLORID]);
        await pool.query(
            'DELETE  FROM "CT_COUNSELLOR_AVAILABILITY_THURSDAY" WHERE "ct_counsellor_id" = $1',
            [COUNSELLORID]);
        await pool.query(
            'DELETE  FROM "CT_COUNSELLOR_AVAILABILITY_FRIDAY" WHERE "ct_counsellor_id" = $1',
            [COUNSELLORID]);
        await pool.query(
            'DELETE FROM "CT_COUNSELLOR_AVAILABILITY_SATURDAY" WHERE "ct_counsellor_id" = $1',
            [COUNSELLORID]);

        console.log({
            COUNSELLOR_COUNTRY_CODE, COUNSELLOR_AVAILABILITY_MONDAY, COUNSELLOR_AVAILABILITY_TUESDAY, COUNSELLOR_AVAILABILITY_WEDNESDAY,
            COUNSELLOR_AVAILABILITY_THURSDAY, COUNSELLOR_AVAILABILITY_FRIDAY, COUNSELLOR_AVAILABILITY_SATURDAY
        });


        if (Array.isArray(COUNSELLOR_AVAILABILITY_MONDAY)) {

            COUNSELLOR_AVAILABILITY_MONDAY.forEach(insertConsellorMonday);

            function insertConsellorMonday(item, index) {

                if (item.TO && item.FROM && COUNSELLOR_COUNTRY_CODE) {
                    pool.query(
                        'INSERT INTO "CT_COUNSELLOR_AVAILABILITY_MONDAY" (    ct_to, ct_from, ct_counsellor_id, ct_counsellor_timezone_code   ) VALUES($1,$2,$3,$4) RETURNING *',
                        [item.TO, item.FROM, COUNSELLORID, COUNSELLOR_COUNTRY_CODE]);
                }
            }
        }

        if (Array.isArray(COUNSELLOR_AVAILABILITY_TUESDAY)) {

            COUNSELLOR_AVAILABILITY_TUESDAY.forEach(insertConsellorTuesday);

            function insertConsellorTuesday(item, index) {

                if (item.TO && item.FROM && COUNSELLOR_COUNTRY_CODE) {
                    pool.query(
                        'INSERT INTO "CT_COUNSELLOR_AVAILABILITY_TUESDAY" (    ct_to, ct_from, ct_counsellor_id, ct_counsellor_timezone_code   ) VALUES($1,$2,$3,$4) RETURNING *',
                        [item.TO, item.FROM, COUNSELLORID, COUNSELLOR_COUNTRY_CODE]);
                }
            }
        }

        if (Array.isArray(COUNSELLOR_AVAILABILITY_WEDNESDAY)) {

            COUNSELLOR_AVAILABILITY_WEDNESDAY.forEach(insertConsellorWednesday);

            function insertConsellorWednesday(item, index) {

                if (item.TO && item.FROM && COUNSELLOR_COUNTRY_CODE) {
                    pool.query(
                        'INSERT INTO "CT_COUNSELLOR_AVAILABILITY_WEDNESDAY" (    ct_to, ct_from, ct_counsellor_id, ct_counsellor_timezone_code   ) VALUES($1,$2,$3,$4) RETURNING *',
                        [item.TO, item.FROM, COUNSELLORID, COUNSELLOR_COUNTRY_CODE]);
                }
            }
        }
        if (Array.isArray(COUNSELLOR_AVAILABILITY_THURSDAY)) {

            COUNSELLOR_AVAILABILITY_THURSDAY.forEach(insertConsellorThursday);

            function insertConsellorThursday(item, index) {

                if (item.TO && item.FROM && COUNSELLOR_COUNTRY_CODE) {
                    pool.query(
                        'INSERT INTO "CT_COUNSELLOR_AVAILABILITY_THURSDAY" (    ct_to, ct_from, ct_counsellor_id, ct_counsellor_timezone_code   ) VALUES($1,$2,$3,$4) RETURNING *',
                        [item.TO, item.FROM, COUNSELLORID, COUNSELLOR_COUNTRY_CODE]);
                }
            }
        }
        if (Array.isArray(COUNSELLOR_AVAILABILITY_FRIDAY)) {

            COUNSELLOR_AVAILABILITY_FRIDAY.forEach(insertConsellorFriday);

            function insertConsellorFriday(item, index) {

                if (item.TO && item.FROM && COUNSELLOR_COUNTRY_CODE) {

                    pool.query(
                        'INSERT INTO "CT_COUNSELLOR_AVAILABILITY_FRIDAY" (    ct_to, ct_from, ct_counsellor_id, ct_counsellor_timezone_code   ) VALUES($1,$2,$3,$4) RETURNING *',
                        [item.TO, item.FROM, COUNSELLORID, COUNSELLOR_COUNTRY_CODE]);
                }
            }
        }
        if (Array.isArray(COUNSELLOR_AVAILABILITY_SATURDAY)) {

            COUNSELLOR_AVAILABILITY_SATURDAY.forEach(insertConsellorSaturday);


            function insertConsellorSaturday(item, index) {
                if (item.TO && item.FROM && COUNSELLOR_COUNTRY_CODE) {

                    pool.query(
                        'INSERT INTO "CT_COUNSELLOR_AVAILABILITY_SATURDAY" (    ct_to, ct_from, ct_counsellor_id, ct_counsellor_timezone_code   ) VALUES($1,$2,$3,$4) RETURNING *',
                        [item.TO, item.FROM, COUNSELLORID, COUNSELLOR_COUNTRY_CODE]);
                }
            }
        }

        res.status(200).json("success");

    } catch (error) {
        console.error(["api consellee update timetable", error.message]);
        res.status(400).json([{ error: "An error occurred ", message: "An error occurred" }]);

    }
})



//update counsellee
router.post("/UpdateDetails", checkCounsellorUpdate, async (req, res) => {
    var { COUNSELLOR_FIRST_NAME,
        COUNSELLOR_LAST_NAME,
        COUNSELLOR_EMAIL,
        COUNSELLOR_PHONE_NUMBER,
        COUNSELLOR_COUNTRY_CODE, COUNSELLOR_QUALIFICATION_INSTITUTE, COUNSELLOR_COUNSELLING_DETAILS } = req.body.formData;
    const COUNSELLORID = req.body.COUNSELLORID;

    try {

        let newUser = pool.query(
            'UPDATE   "CT_COUNSELLOR_DETAILS" SET  "CT_EMAIL" = $1 , "CT_FIRST_NAME" = $2   , "CT_LAST_NAME" = $3   , "CT_PHONE_NUMBER" = $4    , "CT_COUNTRY_CODE" = $5 WHERE "CT_COUNSELLOR_ID" = $6', [
            COUNSELLOR_EMAIL, COUNSELLOR_FIRST_NAME, COUNSELLOR_LAST_NAME, COUNSELLOR_PHONE_NUMBER, COUNSELLOR_COUNTRY_CODE, COUNSELLORID])

        let updateUser = pool.query(
            'UPDATE   "T_USER" SET  "TX_USER_EMAIL" = $1   WHERE "ID_USER_UUID" = $2', [
            COUNSELLOR_EMAIL, COUNSELLORID])
        let delete_Edu = pool.query(
            'DELETE FROM "CT_COUNSELLOR_QUALIFICATION_INSTITUTE"   WHERE "ct_counsellor_id" = $1', [
            COUNSELLORID])
        let delete_Details = pool.query(
            'DELETE FROM "CT_COUNSELLOR_COUNSELLING_DETAILS"   WHERE "ct_counsellor_id" = $1', [
            COUNSELLORID])

        if (COUNSELLOR_QUALIFICATION_INSTITUTE.length > 0) {

            COUNSELLOR_QUALIFICATION_INSTITUTE.forEach(insertConsellorQualInst);
            function insertConsellorQualInst(item, index) {
                pool.query(
                    'INSERT INTO "CT_COUNSELLOR_QUALIFICATION_INSTITUTE" (    ct_institute_code, ct_qualification_code, ct_counsellor_id ) VALUES($1,$2,$3) RETURNING *',
                    [item.CT_INSTITUTE_CODE, item.CT_QUALIFICATION_CODE, COUNSELLORID]);
            }

        }

        if (COUNSELLOR_COUNSELLING_DETAILS.length > 0) {

            COUNSELLOR_COUNSELLING_DETAILS.forEach(insertConsellingDetails);
            function insertConsellingDetails(item, index) {
                pool.query(
                    'INSERT INTO "CT_COUNSELLOR_COUNSELLING_DETAILS" (    ct_counselling_level_code, ct_counselling_subject_code,ct_counsellor_hourly_rate, ct_counsellor_id ) VALUES($1,$2,$3,$4) RETURNING *',
                    [item.CT_COUNSELLING_LEVEL_CODE, item.CT_COUNSELLING_SUBJECT_CODE, item.COUNSELLOR_HOURLY_RATE, COUNSELLORID]);
            }
        }
        res.status(200).json("success");

    } catch (error) {
        console.error(["api consellee update", error.message]);
        res.status(400).json([{ error: "An error occurred ", message: "An error occurred" }]);

    }
})



router.get("/profilePicture/:id", authorization, async (req, res) => {

    try {
        const COUNSELLORID = req.params.id;
        if (COUNSELLORID) {

            const newCounsellorDetails = await pool.query(
                'SELECT "TX_PICTURE" FROM "T_USER" WHERE "ID_USER_UUID" = $1',
                [parseInt(COUNSELLORID)]);
            res.json({ COUNSELLOR_PHOTO: newCounsellorDetails.rows[0].TX_PICTURE });
        }

        res.json([{ error: "User not found ", message: "User not found" }]);


    } catch (error) {
        console.error(["api consellee add", error.message]);
        res.json([{ error: error.message, message: "an error occurred" }]);
    }
})



router.get('/info/:id', async (req, res) => {

    const item = req.params.id;

    try {
        if (item) {
            console.log(item);
            var counsellor_details = await pool.query('SELECT * FROM "CT_COUNSELLOR_DETAILS" where "CT_COUNSELLOR_ID" = $1', [item]);
            var counselling_details = await pool.query('SELECT * FROM "CT_COUNSELLOR_COUNSELLING_DETAILS" where "ct_counsellor_id" = $1', [item]);
            var counselling_education = await pool.query('SELECT * FROM "CT_COUNSELLOR_QUALIFICATION_INSTITUTE" where "ct_counsellor_id" = $1', [item]);
            var counselling_edu_values = [];

            for (let x = 0; x < counselling_education.rowCount; x++) {

                var instituteName = await getName.getInstituteName(counselling_education.rows[x].ct_institute_code);
                counselling_education.rows[x].ct_institute_name = instituteName;

                var qualificationName = await getName.getQualificationsName(counselling_education.rows[x].ct_qualification_code);
                counselling_education.rows[x].ct_qualification_name = qualificationName;

                counselling_edu_values.push(counselling_education.rows[x]);
            }

            var counselling_details_values = [];
            for (let x = 0; x < counselling_details.rowCount; x++) {

                var counsellingLevelName = await getName.getCounsellingLevelName(counselling_details.rows[x].ct_counselling_level_code);
                counselling_details.rows[x].ct_counselling_level_name = counsellingLevelName;

                var counsellingSubjectsName = await getName.getCounsellingSubjectsName(counselling_details.rows[x].ct_counselling_subject_code);
                counselling_details.rows[x].ct_counselling_subject_name = counsellingSubjectsName;

                counselling_details_values.push(counselling_details.rows[x]);
            }
            var account = {
                details: counsellor_details.rows,
                counselling_details: counselling_details_values,
                counselling_education: counselling_edu_values,

            };
            console.log(account);
            res.json({ counsellor: account });
        } else { res.json("no id provided"); }
    } catch (error) {
        console.log(error.message);
        res.json("Server Error");
    }
});


router.get('/GetSingleCounsellorDetails/:id', async (req, res) => {

    const item = req.params.id;

    try {
        if (item) {
            console.log(item);
            var counsellor_details = await pool.query('SELECT * FROM "CT_COUNSELLOR_DETAILS" where "CT_COUNSELLOR_ID" = $1', [item]);
            var counsellor_review = await pool.query('SELECT "CT_COUNSELLOR_REVIEW"."id", "CT_COUNSELLOR_REVIEW"."ct_counsellor_review","CT_COUNSELLOR_REVIEW"."ct_counsellor_stars", "CT_COUNSELLOR_REVIEW"."ct_counsellor_date","CT_COUNSELLOR_REVIEW"."ct_counsellor_user_id" ,"T_USER"."TX_USER_NAME" FROM public."CT_COUNSELLOR_REVIEW" INNER JOIN public."T_USER" ON  CAST("CT_COUNSELLOR_REVIEW"."ct_counsellor_user_id" AS INTEGER) = "T_USER"."ID_USER_UUID" WHERE  "CT_COUNSELLOR_REVIEW"."ct_counsellor_id" = $1', [item]);
            var counselling_details = await pool.query('SELECT * FROM "CT_COUNSELLOR_COUNSELLING_DETAILS" where "ct_counsellor_id" = $1', [item]);
            var counselling_introduction = await pool.query('SELECT * FROM "CT_COUNSELLOR_INTRODUCTION" where "ct_counsellor_id" = $1', [item]);
            var counselling_monday = await pool.query('SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_MONDAY" where "ct_counsellor_id" = $1', [item]);
            var counselling_tuesday = await pool.query('SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_TUESDAY" where "ct_counsellor_id" = $1', [item]);
            var counselling_wednesday = await pool.query('SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_WEDNESDAY" where "ct_counsellor_id" = $1', [item]);
            var counselling_thursday = await pool.query('SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_THURSDAY" where "ct_counsellor_id" = $1', [item]);
            var counselling_friday = await pool.query('SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_FRIDAY" where "ct_counsellor_id" = $1', [item]);
            var counselling_saturday = await pool.query('SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_SATURDAY" where "ct_counsellor_id" = $1', [item]);
            var counselling_education = await pool.query('SELECT * FROM "CT_COUNSELLOR_QUALIFICATION_INSTITUTE" where "ct_counsellor_id" = $1', [item]);
            var user_details = await pool.query('SELECT * FROM "T_USER" where "ID_USER_UUID" = $1', [item]);
            var counselling_edu_values = [];

            for (let x = 0; x < counselling_education.rowCount; x++) {

                var instituteName = getName.getInstituteName(counselling_education.rows[x].ct_institute_code);
                counselling_education.rows[x].ct_institute_name = instituteName;

                var qualificationName = getName.getQualificationsName(counselling_education.rows[x].ct_qualification_code);
                counselling_education.rows[x].ct_qualification_name = qualificationName;

                counselling_edu_values.push(counselling_education.rows[x]);
            }

            var counselling_details_values = [];
            for (let x = 0; x < counselling_details.rowCount; x++) {

                var counsellingLevelName = getName.getCounsellingLevelName(counselling_details.rows[x].ct_counselling_level_code);
                counselling_details.rows[x].ct_counselling_level_name = counsellingLevelName;

                var counsellingSubjectsName = getName.getCounsellingSubjectsName(counselling_details.rows[x].ct_counselling_subject_code);
                counselling_details.rows[x].ct_counselling_subject_name = counsellingSubjectsName;

                counselling_details_values.push(counselling_details.rows[x]);
            }
            var account = {
                counsellor_details: counsellor_details.rows,
                user_details: user_details.rows,
                counsellor_review: counsellor_review.rows,
                counselling_details: counselling_details_values,
                counselling_introduction: counselling_introduction.rows,
                counselling_education: counselling_edu_values,
                counselling_monday: counselling_monday.rows, counselling_tuesday: counselling_tuesday.rows,
                counselling_wednesday: counselling_wednesday.rows, counselling_thursday: counselling_thursday.rows,
                counselling_friday: counselling_friday.rows, counselling_saturday: counselling_saturday.rows
            };
            console.log(account);
            res.json({ counsellor: account });
        } else { res.json("no id provided"); }
    } catch (error) {
        console.log(error.message);
        res.json("Server Error");
    }
});

module.exports = router;

