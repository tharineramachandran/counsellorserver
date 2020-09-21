const Pool = require('pg').Pool;

const pool  = new Pool({
    user: "postgres",
    password: "activants123",
    host: "localhost",
    port:5432,
    database:"ACTIVANTS_LMS_COUNSELLOR",
});

module.exports = pool;

