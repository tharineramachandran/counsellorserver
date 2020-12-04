const router = require('express').Router();
const pool = require("../database/Db_Connection")
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validateInfo");
const authorization = require("../middleware/authorization");
const passport = require('passport');
const { route } = require('./jwtAuth');
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";


router.get('/google' , function(req, res, next) {
    passport.authenticate('google', { scope: ["profile"] }, 
     function(err, user, info) {
     if (err) { return next(err); }
     if (!user) { return res.redirect('/cunselor');          }
     req.logIn(user, function(err) {
       if (err) { return next(err); }
       return res.redirect('/cunselor/' + user.username);
     });
   })(req, res, next);
 });

router.get('/google/callback', passport.authenticate('google', {
    successRedirect:  "/Counsellor/Account",
    failureRedirect: "/counsellorSocialAuth/login/failed"
}));


router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate."
    });
});

router.get("/login/success", async (req, res) => {
    console.log("------------------------- Counsellor success   -----------------------------------------------------------");
    var resUser = res;
    var reqUser = req; 

    if (reqUser.user.rows ) { 
        const jwtToken = jwtGenerator(req.user.googleId);
        res.json({ jwtToken :jwtToken, isCounsellor :reqUser.user.rows[0].IS_COUNSELLOR ,userID :reqUser.user.rows[0].ID_USER_UUID });
    }
    else if (reqUser.user){
        const jwtToken = jwtGenerator(req.user.googleId);
        res.json({ jwtToken :jwtToken, isCounsellor :reqUser.user.IS_COUNSELLOR ,userID :reqUser.user.ID_USER_UUID });
    }
    else
    {
        res.send("not logged in")
    }
});

router.get('/logout', (req, res) => {
    req.logout();    
    res.redirect(CLIENT_HOME_PAGE_URL);
})
 
 
module.exports = router;