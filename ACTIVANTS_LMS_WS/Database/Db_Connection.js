const Pool = require('pg').Pool;

const pool  = new Pool({
    user: "postgres",
    password: "lmscounsellor",
     
    // user: "postgres",
    // password: "1234",
    // host: "localhost",
     port:5432,
    database:"ACTIVANTS_LMS_COUNSELLOR",
});

module.exports = pool;

