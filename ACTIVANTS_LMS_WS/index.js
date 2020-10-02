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

app.listen(5000, () => {
    console.log("server started...")
})