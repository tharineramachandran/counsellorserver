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

router.get('/google', passport.authenticate('google', { scope: ["profile"] }));

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

router.get("/login/success", (req, res) => {
    console.log(req.user);
    if (req.user) {
        const jwtToken = jwtGenerator(req.user.googleId);
        res.json({ jwtToken });
       
    }
    else
    {
        res.send("not logged in")
    }
});


router.get('/logout', (req, res) => {
    req.logout();
    console.log(req.user)
    res.redirect(CLIENT_HOME_PAGE_URL);
})


module.exports = router;