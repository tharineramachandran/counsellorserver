const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');
const pool = require("../database/Db_Connection")

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
    callbackURL: "/socialauth/google/callback"
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
                let newUser = await pool.query(
                    'INSERT INTO "T_USER" ("TX_USER_NAME","TX_VERIFICATION_STATUS","DT_DATE_CREATED","IN_ACTIVE", "TX_GOOGLE_ID") VALUES ($1,$2,$3,$4,$5) RETURNING *',
                    [profile.displayName, 1, datetime.toISOString().slice(0, 10), 1, profile.id]
                );
                done(null, newUser);
            }

        } catch (err) {
            console.log("-----------------------------");
            console.error(err.message);
        }
    }
));