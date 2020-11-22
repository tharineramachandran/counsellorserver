module.exports = (req, res, next) => {
    const { COUNSELLOR_FIRST_NAME,
        COUNSELLOR_LAST_NAME,
        COUNSELLOR_EMAIL,
        COUNSELLOR_PHONE_NUMBER,
        COUNSELLOR_COUNTRY_CODE,
        COUNSELLOR_COUNSELLING_SUBJECT_ID,
        COUNSELLOR_HOURLY_RATE,
        COUNSELLOR_QUALIFICATION_INSTITUTE,
        COUNSELLOR_COUNSELLING_DETAILS,
        COUNSELLOR_PHOTO, COUNSELLOR_HEADLINE, COUNSELLOR_ABOUT_DESCRIPTION,
        COUNSELLOR_VIDEO_URL,
        COUNSELLOR_TIME_ZONE_CODE, 
        COUNSELLOR_DOCUMENT_IMAGE, } = req.body.formData;

    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    function is_url(str) {
        regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str)) {
            return true;
        }
        else {
            return false;
        }
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
    if (req.path === "/createCounsellee") {
        if (![COUNSELLOR_FIRST_NAME].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_FIRST_NAME", message: "No firstname provided" });
        }
        if (![COUNSELLOR_LAST_NAME].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_LAST_NAME", message: "No lastname provided" });
        }

        if (![COUNSELLOR_COUNTRY_CODE].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_COUNTRY_CODE", message: "No country code provided" });
        }

        if (![COUNSELLOR_PHONE_NUMBER].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_PHONE_NUMBER", message: "No phone number provided" });
        } else if (isNaN(COUNSELLOR_PHONE_NUMBER)) {
            errorlist.push({ error: "COUNSELLOR_PHONE_NUMBER", message: "Invalid phone number provided" });
        }

        if (![COUNSELLOR_EMAIL].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_EMAIL", message: "No email provided" });
        } else if (!validEmail(COUNSELLOR_EMAIL)) {
            errorlist.push({ error: "COUNSELLOR_EMAIL", message: "Invalid email provided" });
        }


        if (![COUNSELLOR_ABOUT_DESCRIPTION].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_ABOUT_DESCRIPTION", message: "No about description provided" });
        }
        if (![COUNSELLOR_PHOTO].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_PHOTO", message: "No photo provided" });
        }

        if (![COUNSELLOR_HEADLINE].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_HEADLINE", message: "No headline provided" });
        }

        if (![COUNSELLOR_VIDEO_URL].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_VIDEO_URL", message: "No video URL provided" });
        } else if (!is_url(COUNSELLOR_VIDEO_URL)) {
            errorlist.push({ error: "COUNSELLOR_VIDEO_URL", message: "Invalid URL provided" });
        } else if (!COUNSELLOR_VIDEO_URL.includes("youtube.com")) {
            errorlist.push({ error: "COUNSELLOR_VIDEO_URL", message: "Invalid Youtube URL provided" });
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