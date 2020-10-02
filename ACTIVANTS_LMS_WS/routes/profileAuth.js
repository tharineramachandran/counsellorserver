const router = require('express').Router();
const jwtGenerator = require("../utils/jwtGenerator");

const authChecking = (req, res, next) => {
    if (!req.isAuthenticated()) {
 
  res.redirect('/socialauth/login');
    }
    
        
    else
        next();
};

router.get("/", authChecking, (req, res) => {
    const jwtToken = jwtGenerator(req.user.googleId);
    res.json({ jwtToken });
})

module.exports = router;
