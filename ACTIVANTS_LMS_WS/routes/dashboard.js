const router = require("express").Router();
const pool = require("../database/Db_Connection");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
    try {
        console.log(req.user);
        console.log(authorization); 

        console.log(req.user);
        const user = await pool.query('SELECT "TX_USER_NAME","TX_USER_EMAIL" FROM "T_USER" WHERE "ID_USER_UUID" = $1',
        [req.user]);
        console.log("-------dashboard-------", user.rows[0]);
        res.json(user.rows[0]);
        
    } catch (error) {
        console.log(error.message);
        res.send(500).json("Server Error");
    }
})

module.exports = router;