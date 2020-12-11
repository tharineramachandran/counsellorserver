const router = require('express').Router();
const pool = require("../database/Db_Connection")
const authorization = require("../middleware/authorization");

const getName = require("../functions/names");
const { baseURLAPI, baseURL } = require('../Global');


router.post("/addFavorites", authorization, async (req, res) => {
    var { userID, favouriteID } = req.body.formData;


    try {
        const user = await pool.query('SELECT  * FROM "T_USER_FAVORITES" WHERE "ct_user_id" = $1', [userID]);

        if (user.rowCount > 0) {

            let newUser = await pool.query(
                'UPDATE   "T_USER_FAVORITES"   SET ct_user_fav = array_cat(ct_user_fav,   $1  )  WHERE "ct_user_id" = $2', [
                [favouriteID], userID])
        } else {
            let newUser = await pool.query(
                ' INSERT INTO "T_USER_FAVORITES" (ct_user_id, ct_user_fav) VALUES($1,     $2 ) RETURNING *', [
                userID, [favouriteID]])
        }
        res.status(200).json("success");

    } catch (error) {
        console.error(["api consellee update", error.message]);
        res.status(400).json([{ error: "An error occurred ", message: "An error occurred" }]);
    }
})


router.get("/userfavourites/:id"  , async (req, res) => {
    var id = req.params.id;
    var final_details = [];

    try {
        const user = await pool.query('SELECT  * FROM "T_USER_FAVORITES" WHERE "ct_user_id" = $1', [id]);

        if (user.rowCount > 0) {

            console.log(user.rows[0]);
            var details = user.rows[0].ct_user_fav;

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

                var view_counsellor_review = []


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
                var FavisAvailable = true;
                counsellor_details.rows[0].FavisAvailable = 1;
 
                var account = {
                    counsellor_details: counsellor_details.rows,
                    FavisAvailable: FavisAvailable,
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
        }
        
    } catch (error) {
        console.error(["api consellee update", error.message]);

    } res.json({ counsellor: final_details });
})

router.post("/removeFavorites", authorization, async (req, res) => {
    var { userID, favouriteID } = req.body.formData;


    try {
        const user = await pool.query('SELECT  * FROM "T_USER_FAVORITES" WHERE "ct_user_id" = $1', [userID]);

        if (user.rowCount > 0) {

            let newUser = await pool.query(
                'UPDATE   "T_USER_FAVORITES"   SET ct_user_fav = array_remove(ct_user_fav,   $1  )  WHERE "ct_user_id" = $2', [
                favouriteID, userID])
        }
        res.status(200).json("success");

    } catch (error) {
        console.error(["api consellee update", error.message]);
        res.status(400).json([{ error: "An error occurred ", message: "An error occurred" }]);
    }
})



module.exports = router;