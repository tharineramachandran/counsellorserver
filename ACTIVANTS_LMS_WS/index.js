const express = require("express");
const app = express();
const cors = require("cors");
const pool = require('./database/Db_Connection');
const socialAuth = require("./routes/socialAuth");
const profileAuth = require("./routes/profileAuth");
const passport = require("passport");
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const cookieParser = require("cookie-parser");
require('./config/passportSetup');

// app.use(cors());
app.use(express.json());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

app.use(cookieParser());

app.use(passport.initialize());

app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);

//routes
app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/socialauth", socialAuth);
app.use("/profile", profileAuth)
app.use("/Counsellor", require("./routes/counsellor")); 


// //create counsellor
// app.post("/counsellor", async (req, res) => {
//     try {
//         const { COUNSELLOR_NAME, COUNSELLOR_AGE } = req.body;
//         console.log(req.body);
//         const newCounsellor = await pool.query(
//             'INSERT INTO "COUNSELLOR" ("COUNSELLOR_NAME","COUNSELLOR_AGE") VALUES($1,$2) RETURNING *',
//             [COUNSELLOR_NAME, COUNSELLOR_AGE]);
//         res.json(newCounsellor.rows[0]);

//     } catch (error) {
//         console.error(error.message);
//     }
// })



// //create counsellor
// app.post("/createCounsellor", async (req, res) => {

//     try {
//         var { COUNSELLOR_FIRST_NAME,
//             COUNSELLOR_LAST_NAME,
//             COUNSELLOR_EMAIL,
//             COUNSELLOR_PHONE_NUMBER,
//             COUNSELLOR_COUNTRY_CODE,
//             COUNSELLOR_COUNSELLING_SUBJECT_ID,
//             COUNSELLOR_HOURLY_RATE,
//             COUNSELLOR_QUALIFICATION_INSTITUTE,
//             COUNSELLOR_COUNSELLING_DETAILS,
//             COUNSELLOR_PHOTO, COUNSELLOR_HEADLINE, COUNSELLOR_ABOUT_DESCRIPTION,
//             COUNSELLOR_VIDEO_URL,
//             COUNSELLOR_TIME_ZONE_CODE, COUNSELLOR_AVAILABILITY_MONDAY, COUNSELLOR_AVAILABILITY_TUESDAY, COUNSELLOR_AVAILABILITY_WEDNESDAY,
//             COUNSELLOR_AVAILABILITY_THURSDAY, COUNSELLOR_AVAILABILITY_FRIDAY, COUNSELLOR_AVAILABILITY_SATURDAY,
//             COUNSELLOR_DOCUMENT_IMAGE, } = req.body.formData;


//         console.log("--------------------------------------------");
//         console.log(COUNSELLOR_EMAIL);

//         const user = await pool.query('SELECT * FROM "T_USER" WHERE "TX_USER_EMAIL" = $1', [
//             COUNSELLOR_EMAIL]);

//         if (user.rows.length !== 0) {

//             const COUNSELLORID = await user.rows[0].ID_USER_UUID;
//             const newCounsellorDetails = await pool.query(
//                 'INSERT INTO "CT_COUNSELLOR_DETAILS" ("CT_EMAIL", "CT_FIRST_NAME", "CT_LAST_NAME", "CT_PHONE_NUMBER", "CT_COUNTRY_CODE", "CT_COUNSELLOR_ID") VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
//                 [COUNSELLOR_EMAIL, COUNSELLOR_FIRST_NAME, COUNSELLOR_LAST_NAME, COUNSELLOR_PHONE_NUMBER, COUNSELLOR_COUNTRY_CODE, COUNSELLORID]);

//             const newCounsellorIntroductionDetails = await pool.query(
//                 'INSERT INTO "CT_COUNSELLOR_INTRODUCTION" (   ct_counsellor_about_description, ct_counsellor_photo, ct_counsellor_headline, ct_counsellor_video_url, ct_counsellor_id) VALUES($1,$2,$3,$4,$5) RETURNING *',
//                 [COUNSELLOR_ABOUT_DESCRIPTION, COUNSELLOR_PHOTO, COUNSELLOR_HEADLINE, COUNSELLOR_VIDEO_URL, COUNSELLORID]);


//             COUNSELLOR_QUALIFICATION_INSTITUTE.forEach(insertConsellorQualInst);

//             function insertConsellorQualInst(item, index) {
//                 pool.query(
//                     'INSERT INTO "CT_COUNSELLOR_QUALIFICATION_INSTITUTE" (    ct_institute_code, ct_qualification_code, ct_counsellor_id ) VALUES($1,$2,$3) RETURNING *',
//                     [item.CT_INSTITUTE_CODE, item.CT_QUALIFICATION_CODE, COUNSELLORID]);
//             }


//             COUNSELLOR_COUNSELLING_DETAILS.forEach(insertConsellingDetails);

//             function insertConsellingDetails(item, index) {
//                 pool.query(
//                     'INSERT INTO "CT_COUNSELLOR_COUNSELLING_DETAILS" (    ct_counselling_level_code, ct_counselling_subject_code,ct_counsellor_hourly_rate, ct_counsellor_id ) VALUES($1,$2,$3,$4) RETURNING *',
//                     [item.CT_COUNSELLING_LEVEL_CODE, item.CT_COUNSELLING_SUBJECT_CODE, item.COUNSELLOR_HOURLY_RATE, COUNSELLORID]);
//             }

//             COUNSELLOR_AVAILABILITY_MONDAY.forEach(insertConsellorMonday);

//             function insertConsellorMonday(item, index) {
//                 pool.query(
//                     'INSERT INTO "CT_COUNSELLOR_AVAILABILITY_MONDAY" (    ct_to, ct_from, ct_counsellor_id, ct_counsellor_timezone_code   ) VALUES($1,$2,$3,$4) RETURNING *',
//                     [item.TO, item.FROM, COUNSELLORID, COUNSELLOR_TIME_ZONE_CODE]);
//             }


//             COUNSELLOR_AVAILABILITY_TUESDAY.forEach(insertConsellorTuesday);

//             function insertConsellorTuesday(item, index) {
//                 pool.query(
//                     'INSERT INTO "CT_COUNSELLOR_AVAILABILITY_TUESDAY" (    ct_to, ct_from, ct_counsellor_id, ct_counsellor_timezone_code   ) VALUES($1,$2,$3,$4) RETURNING *',
//                     [item.TO, item.FROM, COUNSELLORID, COUNSELLOR_TIME_ZONE_CODE]);
//             }

//             COUNSELLOR_AVAILABILITY_WEDNESDAY.forEach(insertConsellorWednesday);

//             function insertConsellorWednesday(item, index) {
//                 pool.query(
//                     'INSERT INTO "CT_COUNSELLOR_AVAILABILITY_WEDNESDAY" (    ct_to, ct_from, ct_counsellor_id, ct_counsellor_timezone_code   ) VALUES($1,$2,$3,$4) RETURNING *',
//                     [item.TO, item.FROM, COUNSELLORID, COUNSELLOR_TIME_ZONE_CODE]);
//             }

//             COUNSELLOR_AVAILABILITY_THURSDAY.forEach(insertConsellorThursday);

//             function insertConsellorThursday(item, index) {
//                 pool.query(
//                     'INSERT INTO "CT_COUNSELLOR_AVAILABILITY_THURSDAY" (    ct_to, ct_from, ct_counsellor_id, ct_counsellor_timezone_code   ) VALUES($1,$2,$3,$4) RETURNING *',
//                     [item.TO, item.FROM, COUNSELLORID, COUNSELLOR_TIME_ZONE_CODE]);
//             }

//             COUNSELLOR_AVAILABILITY_FRIDAY.forEach(insertConsellorFriday);

//             function insertConsellorFriday(item, index) {
//                 pool.query(
//                     'INSERT INTO "CT_COUNSELLOR_AVAILABILITY_FRIDAY" (    ct_to, ct_from, ct_counsellor_id, ct_counsellor_timezone_code   ) VALUES($1,$2,$3,$4) RETURNING *',
//                     [item.TO, item.FROM, COUNSELLORID, COUNSELLOR_TIME_ZONE_CODE]);
//             }

//             COUNSELLOR_AVAILABILITY_SATURDAY.forEach(insertConsellorSaturday);

//             function insertConsellorSaturday(item, index) {
//                 pool.query(
//                     'INSERT INTO "CT_COUNSELLOR_AVAILABILITY_SATURDAY" (    ct_to, ct_from, ct_counsellor_id, ct_counsellor_timezone_code   ) VALUES($1,$2,$3,$4) RETURNING *',
//                     [item.TO, item.FROM, COUNSELLORID, COUNSELLOR_TIME_ZONE_CODE]);
//             }

//             res.json("success");

//         }

//         res.json("User not found");

//     } catch (error) {
//         console.error(error.message);
//     }
// })


//get All counsellor
app.get("/form/list", async (req, res) => {
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

// app.get("/counsellor", async (req, res) => {
//     try {
//         const users = await pool.query('SELECT * FROM "T_USER"');
//         res.json({
//             users: users.rows
//         })
//     } catch (error) {
//         console.log(error.message)
//     }
// })


//get counsellor
// app.get("/Counsellor/:id", async(req,res) => {
//     try {
//         const { id } = req.params;
//         const Counsellor = await pool.query('SELECT * FROM "COUNSELLOR" where "COUNSELLOR_ID" = $1', [id]);
//         res.json(Counsellor.rows[0])

//     } catch (error) {
//         console.log(error.message);
//     }
// })

// //update counsellor
// app.put("/Counsellor/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { COUNSELLOR_NAME, COUNSELLOR_AGE } = req.body;
//         const UpdateCounsellor = await pool.query(
//             'UPDATE "COUNSELLOR" SET "COUNSELLOR_NAME" = $1, "COUNSELLOR_AGE" = $2 WHERE "COUNSELLOR_ID" = $3 RETURNING *', [COUNSELLOR_NAME, COUNSELLOR_AGE, id]);
//         res.json(UpdateCounsellor.rows[0])

//     } catch (error) {
//         console.log(error.message);
//     }
// })


// //DELETE
// app.delete("/Counsellor/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const DeleteCounsellor = await pool.query(
//             'DELETE FROM "COUNSELLOR" WHERE "COUNSELLOR_ID" = $1 RETURNING *', [id]);
//         res.json("COUNSELLOR DELETED")

//     } catch (error) {
//         console.log(error.message);
//     }
// })

// //DELETE ALL
// app.delete("/Counsellor", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const DeleteCounsellor = await pool.query('DELETE FROM "COUNSELLOR"');
//         res.json("COUNSELLOR DELETED")

//     } catch (error) {
//         console.log(error.message);
//     }
// })


app.listen(5000, () => {
    console.log("server started...")
})