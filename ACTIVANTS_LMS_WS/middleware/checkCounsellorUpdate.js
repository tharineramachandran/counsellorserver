
 
const pool = require("../database/Db_Connection");

module.exports = (req, res, next) => {
    const { COUNSELLOR_FIRST_NAME,
        COUNSELLOR_LAST_NAME,
        COUNSELLOR_EMAIL,
        COUNSELLOR_PHONE_NUMBER,
        COUNSELLOR_COUNTRY_CODE  , COUNSELLOR_QUALIFICATION_INSTITUTE,
        COUNSELLOR_COUNSELLING_DETAILS,} = req.body.formData;
        COUNSELLORID= req.body.COUNSELLORID          ;
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
 
    function checkQualification(COUNSELLOR_QUALIFICATION_INSTITUTE) {
        var checkQualification = false;
        for (var i = 0; i < COUNSELLOR_QUALIFICATION_INSTITUTE.length; i++) {

            if (!(COUNSELLOR_QUALIFICATION_INSTITUTE[i].CT_INSTITUTE_CODE && COUNSELLOR_QUALIFICATION_INSTITUTE[i].CT_QUALIFICATION_CODE)) {
                checkQualification = true;
                break;

            }
        }
        return checkQualification;
    }

    function checkCounsellingDetails(COUNSELLOR_COUNSELLING_DETAILS) {
        var checkCounselling = false;
        for (var i = 0; i < COUNSELLOR_COUNSELLING_DETAILS.length; i++) {

            if (!(COUNSELLOR_COUNSELLING_DETAILS[i].COUNSELLOR_HOURLY_RATE && COUNSELLOR_COUNSELLING_DETAILS[i].CT_COUNSELLING_LEVEL_CODE && COUNSELLOR_COUNSELLING_DETAILS[i].CT_COUNSELLING_SUBJECT_CODE)) {
                checkCounselling = true;
                break;

            } else if (isNaN(COUNSELLOR_COUNSELLING_DETAILS[i].COUNSELLOR_HOURLY_RATE)) {
                checkCounselling = true;
                break;
            }
        }
        return checkCounselling;
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
        if (COUNSELLOR_QUALIFICATION_INSTITUTE.length > 0) {
            if (checkQualification(COUNSELLOR_QUALIFICATION_INSTITUTE)) {
                errorlist.push({ error: "COUNSELLOR_QUALIFICATION_INSTITUTE", message: "missing qualification and institute information" });
            }
        } else {
            errorlist.push({ error: "COUNSELLOR_QUALIFICATION_INSTITUTE", message: "No qualification and institute provided" });
        }

        if (COUNSELLOR_COUNSELLING_DETAILS.length > 0) {
            if (checkCounsellingDetails(COUNSELLOR_COUNSELLING_DETAILS)) {
                errorlist.push({ error: "COUNSELLOR_COUNSELLING_DETAILS", message: "missing conselling details information" });
            }
        } else {
            errorlist.push({ error: "COUNSELLOR_COUNSELLING_DETAILS", message: "No conselling details provided" });
        }

        if (errorlist.length > 0) {
            return res.status(401).json(errorlist);
        }
    }

    next();
};