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


//create counsellor
app.post("/counsellor", async (req, res) => {
    try {
        const { COUNSELLOR_NAME, COUNSELLOR_AGE } = req.body;
        console.log(req.body);
        const newCounsellor = await pool.query(
            'INSERT INTO "COUNSELLOR" ("COUNSELLOR_NAME","COUNSELLOR_AGE") VALUES($1,$2) RETURNING *',
            [COUNSELLOR_NAME, COUNSELLOR_AGE]);
        res.json(newCounsellor.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
})

//get All counsellor
app.get("/counsellor/list", async (req, res) => {
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

app.get("/counsellor", async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM "T_USER"');
        res.json({
            users: users.rows
        })
    } catch (error) {
        console.log(error.message)
    }
})


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

//update counsellor
app.put("/Counsellor/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { COUNSELLOR_NAME, COUNSELLOR_AGE } = req.body;
        const UpdateCounsellor = await pool.query(
            'UPDATE "COUNSELLOR" SET "COUNSELLOR_NAME" = $1, "COUNSELLOR_AGE" = $2 WHERE "COUNSELLOR_ID" = $3 RETURNING *', [COUNSELLOR_NAME, COUNSELLOR_AGE, id]);
        res.json(UpdateCounsellor.rows[0])

    } catch (error) {
        console.log(error.message);
    }
})


//DELETE
app.delete("/Counsellor/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const DeleteCounsellor = await pool.query(
            'DELETE FROM "COUNSELLOR" WHERE "COUNSELLOR_ID" = $1 RETURNING *', [id]);
        res.json("COUNSELLOR DELETED")

    } catch (error) {
        console.log(error.message);
    }
})

//DELETE ALL
app.delete("/Counsellor", async (req, res) => {
    try {
        const { id } = req.params;
        const DeleteCounsellor = await pool.query('DELETE FROM "COUNSELLOR"');
        res.json("COUNSELLOR DELETED")

    } catch (error) {
        console.log(error.message);
    }
})


app.listen(5000, () => {
    console.log("server started...")
})