
 
const pool = require("../database/Db_Connection");

module.exports = (req, res, next) => {
    const { COUNSELLOR_FIRST_NAME,
        COUNSELLOR_LAST_NAME,
        COUNSELLOR_EMAIL,
        COUNSELLOR_PHONE_NUMBER,
        COUNSELLOR_COUNTRY_CODE   } = req.body.formData;
        COUNSELLORID= req.body.COUNSELLORID          ;
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
 
    var errorlist = [];
    if (req.path === "/UpdateDetails") {
        if (![COUNSELLOR_FIRST_NAME].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_FIRST_NAME", message: "No firstname provided" });
        }else if (COUNSELLOR_FIRST_NAME.length >  50){
            errorlist.push({ error: "COUNSELLOR_FIRST_NAME", message: "firstname not more than  50 letters" });
        }


        if (![COUNSELLOR_LAST_NAME].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_LAST_NAME", message: "No lastname provided" });
        }else if (COUNSELLOR_LAST_NAME.length >  50){
            errorlist.push({ error: "COUNSELLOR_LAST_NAME", message: "lastname not more than  50 letters" });
        }

        if (![COUNSELLOR_COUNTRY_CODE].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_COUNTRY_CODE", message: "No country code provided" });
        }

        if (![COUNSELLOR_PHONE_NUMBER].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_PHONE_NUMBER", message: "No phone number provided" });
        } else if (isNaN(COUNSELLOR_PHONE_NUMBER)) {
            errorlist.push({ error: "COUNSELLOR_PHONE_NUMBER", message: "Invalid phone number provided" });
        }else if (COUNSELLOR_PHONE_NUMBER.length >  10){
            errorlist.push({ error: "COUNSELLOR_PHONE_NUMBER", message: "phone number not more than  10 numbers" });
        }

        if (![COUNSELLOR_EMAIL].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_EMAIL", message: "No email provided" });
        } else if (!validEmail(COUNSELLOR_EMAIL)) {
            errorlist.push({ error: "COUNSELLOR_EMAIL", message: "Invalid email provided" });
        }
        

        if (errorlist.length > 0) {
            return res.status(401).json(errorlist);
        }
    }

    next();
};