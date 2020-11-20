const router = require('express').Router();
const pool = require("../database/Db_Connection")
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validateInfo");
const authorization = require("../middleware/authorization");
const passport = require('passport');
const { route } = require('./jwtAuth');

const { baseURLAPI ,baseURL   } = require('../Global');

const CLIENT_HOME_PAGE_URL = baseURL;
const CLIENT_BASEURL_PAGE_URL = baseURLAPI ;

//1.scope : what info you need to retrieve..  

// router.get('/google', passport.authenticate('google', { scope: ["profile"] }));

 
router.get('/google/:id', function (req, res, next) {
var param = req.params.id ; 
    passport.authenticate('google', { scope: ["profile", "https://www.googleapis.com/auth/calendar",
    'https://www.googleapis.com/auth/userinfo.email' ] , state :param  },
        function (err, user, info) {    
            if (err) { return next(err); }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                 

                var isCounsellorValue = parseInt( req.query.state); 
                console.log("================asdfasdfasdf ");   console.log(isCounsellorValue);
                user.IS_COUNSELLOR = isCounsellorValue;
                console.log("================IS_COUNSELLOR ");   console.log(user);
              if(req.user.IS_COUNSELLOR != 1  ||   req.user.IS_COUNSELLOR != 2     ){ 
                  
                let newUser =   pool.query(
                    'UPDATE   "T_USER" SET  "IS_COUNSELLOR" = $1  WHERE "ID_USER_UUID" = $2', [
                        isCounsellorValue, req.user.ID_USER_UUID
                  ]) 
                  passport.serializeUser(function(user, done) {
                    done(null, user);
                  });
                
                }
               
                return res.redirect(CLIENT_HOME_PAGE_URL);
            });
        })(req, res, next);
});

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: CLIENT_BASEURL_PAGE_URL+"/socialauth/login/failed"
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
        const user = await pool.query('SELECT "TX_PICTURE",   "IS_COUNSELLOR" , "ID_USER_UUID" , "TX_USER_EMAIL" , "TX_USER_NAME" ,"ID_USER_UUID"   FROM "T_USER" WHERE "ID_USER_UUID" = $1', [reqUser.user.rows[0].ID_USER_UUID]);


        res.json({ jwtToken: jwtToken, user: user.rows[0] });
    }
    else if (reqUser.user) {
        const jwtToken = jwtGenerator(req.user.googleId);
        const user = await pool.query('SELECT "TX_PICTURE",   "IS_COUNSELLOR" , "ID_USER_UUID" , "TX_USER_EMAIL" , "TX_USER_NAME" ,"ID_USER_UUID"   FROM "T_USER" WHERE "ID_USER_UUID" = $1', [reqUser.user.ID_USER_UUID]);

        res.json({ jwtToken: jwtToken, user:  user.rows[0]  });
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