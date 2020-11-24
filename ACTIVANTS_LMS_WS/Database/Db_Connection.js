const Pool = require('pg').Pool;

const pool  = new Pool({
    // user: "LMScounsellor",
    // password: "lmscounsellor",
    // host: "lmscounsellor.cgepka50vsag.us-east-2.rds.amazonaws.com",
    user: "postgres",
    password: "1234",
    host: "localhost",
    port:5432,
    database:"ACTIVANTS_LMS_COUNSELLOR",
});

module.exports = pool;

