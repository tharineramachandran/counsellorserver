const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const pool = require("../database/Db_Connection")
const { baseURLAPI ,baseURL   } = require('../Global');

const CLIENT_HOME_PAGE_URL = baseURL;
const CLIENT_BASEURL_PAGE_URL = baseURLAPI ;
//create cookie and send to browser
passport.serializeUser((user, done) => {
    console.log("serialise user", user);
    done(null, user); //make cookie with id
});

//authorisation based on Browser cookie,
passport.deserializeUser((user, done) => {
    console.log("serialise user", user);
    done(null, user); //make cookie with id
});

//2.
passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: CLIENT_BASEURL_PAGE_URL +"/socialauth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
        //4.called by custom callback, fires back again to the custom call back  
         
        try {
            const user = await pool.query('SELECT * FROM "T_USER" WHERE "TX_GOOGLE_ID" = $1', [profile.id]);
            var datetime = new Date();

            if (user.rows.length !== 0) { //use the UUID for cookie.
                done(null, user.rows[0])
            }
            else {
                
            console.log("--------------         normal user             ---------------");
           
                let newUser = await pool.query(
                    'INSERT INTO "T_USER" ("TX_USER_NAME","TX_VERIFICATION_STATUS","DT_DATE_CREATED","IN_ACTIVE", "TX_GOOGLE_ID", "TX_USER_EMAIL","IS_COUNSELLOR","TX_IS_COMPLETED") VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
                    [profile.displayName, 1, datetime.toISOString().slice(0, 10), 1,  profile.id,  profile.emails[0].value,3,0]
                );
                done(null, newUser);
            }

        } catch (err) { 
            console.log("-----------------------------");
         
        }
    }
));
 