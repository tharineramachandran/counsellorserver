
const router = require("express").Router();
const pool = require("../database/Db_Connection");
const authorization = require("../middleware/authorization");
const getName = require("../functions/names");
const awsS3 = require("../functions/awsS3");
const createCounsellorValidation = require("../middleware/createCounsellorValidation");

router.get("/GetCounsellorDetails", async (req, res) => {

    try {

        var details = [];
        var final_details = [];

        const query = await pool.query('SELECT * FROM "CT_COUNSELLOR_DETAILS" ');

        for (let i = 0; i < query.rowCount; i++) {

            details.push(query.rows[i].CT_COUNSELLOR_ID);
        }

        for (let i = 0; i < details.length; i++) {
            var item = details[i];

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
            var counselling_average_price = counselling_total_price / counselling_details.rowCount; 
            var counselling_average_review = counselling_total_review / counsellor_review.rowCount;
 
            var account = {
                counsellor_details: counsellor_details.rows,
                counsellor_review: counsellor_review.rows,
                counselling_details: counselling_details_values,
                counselling_introduction: counselling_introduction.rows,
                counselling_education: counselling_edu_values,
                counselling_monday: counselling_monday.rows, counselling_tuesday: counselling_tuesday.rows,
                counselling_wednesday: counselling_wednesday.rows, counselling_thursday: counselling_thursday.rows,
                counselling_friday: counselling_friday.rows, counselling_saturday: counselling_saturday.rows,
                counselling_average_review:  Math.floor(counselling_average_review)    ,
                counselling_average_price:  Math.floor(counselling_average_price)   ,
                counselling_total_review : counsellor_review.rowCount
            };

            final_details.push(account);
        }
        res.json({ counsellor: final_details });
    } catch (error) {
        console.log(error.message);
        res.status(400).json("Server Error");
    }
});


//create counsellor
router.post("/createCounsellor", createCounsellorValidation, async (req, res) => {

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
            var uploadtoS3   = false;
            var filestring =  [];
             
            for (i = 0; i < COUNSELLOR_FILES.length; i++) {
               var file  = COUNSELLOR_FILES[i]  ;
                file.name = COUNSELLORID +"-"+  Math.floor(Math.random() * (1000000 - 1) + 1);  ;
                filestring.push(file.name);
              
                


              }
              
         

            if (user.rows.length == 1) {
                  uploadtoS3   = await  awsS3.uploadtoS3(COUNSELLOR_FILES , "counsellorverify");

            }

          
            
        if (user.rows.length == 1 && uploadtoS3) {

            const newCounsellorDetails = await pool.query(
                'INSERT INTO "CT_COUNSELLOR_DETAILS" ("CT_EMAIL", "CT_FIRST_NAME", "CT_LAST_NAME", "CT_PHONE_NUMBER", "CT_COUNTRY_CODE", "CT_COUNSELLOR_ID","CT_COUNSELLOR_VERIFY") VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',
                [COUNSELLOR_EMAIL, COUNSELLOR_FIRST_NAME, COUNSELLOR_LAST_NAME, COUNSELLOR_PHONE_NUMBER, COUNSELLOR_COUNTRY_CODE, COUNSELLORID,filestring.toString()]);

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
           // res.status(400).json([{ error: "User not found ", message: "User not found" }]);
           res.status(200).json("success");
        }


        res.status(400).json([{ error: "User not found ", message: "User not found" }]);
    } catch (error) {
        console.error(error.message);
        res.status(400).json([{ error: "Duplicate account  found ", message: "Duplicate account  found" }]);
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

