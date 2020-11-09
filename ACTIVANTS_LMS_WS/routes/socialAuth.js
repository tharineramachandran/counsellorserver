const router = require('express').Router();
const pool = require("../database/Db_Connection")
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validateInfo");
const authorization = require("../middleware/authorization");
const passport = require('passport');
const { route } = require('./jwtAuth');
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

//1.scope : what info you need to retrieve..  

// router.get('/google', passport.authenticate('google', { scope: ["profile"] }));

var item = [];
router.get('/google/:id', function (req, res, next) {

    item.push(req.params.id);
    passport.authenticate('google', { scope: ["profile", "https://www.googleapis.com/auth/calendar",
    'https://www.googleapis.com/auth/userinfo.email' ] },
        function (err, user, info) {
            if (err) { return next(err); }
            req.logIn(user, function (err) {
                if (err) { return next(err); }

                if (user.rows) {

                    if (user.rows[0].IS_COUNSELLOR == 3) {
                        const Updateduser = pool.query('UPDATE "T_USER" SET "IS_COUNSELLOR" = $1 WHERE "ID_USER_UUID" = $2', [item[0], user.rows[0].ID_USER_UUID]);
                        item = []
                    }
                }

                return res.redirect(CLIENT_HOME_PAGE_URL);
            });
        })(req, res, next);
});

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/socialauth/login/failed"
}));

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate."
    });
});

router.get("/login/success", async (req, res) => {
    try {console.log("------------------------- user success    -----------------------------------------------------------");
    var resUser = res;
    var reqUser = req;

    if (reqUser.user.rows) {
        const jwtToken = jwtGenerator(req.user.googleId);
        res.json({ jwtToken: jwtToken, isCounsellor: reqUser.user.rows[0].IS_COUNSELLOR, userID: reqUser.user.rows[0].ID_USER_UUID });
    }
    else if (reqUser.user) {
        const jwtToken = jwtGenerator(req.user.googleId);
        res.json({ jwtToken: jwtToken, isCounsellor: reqUser.user.IS_COUNSELLOR, userID: reqUser.user.ID_USER_UUID });
    }
    else {
        res.send("not logged in")
    }}catch(err){ console.log(["-------------------------",err.message]);}
    
});

router.get('/logout', (req, res) => {
    req.logout();
    console.log(req.user)
    console.log(req.user)
    res.redirect(CLIENT_HOME_PAGE_URL);
})

module.exports = router;