module.exports = (req, res, next) => {
    const { COUNSELLOR_FIRST_NAME,
        COUNSELLOR_LAST_NAME,
        COUNSELLOR_EMAIL,COUNSELLOR_FILES,
        COUNSELLOR_PHONE_NUMBER,
        COUNSELLOR_COUNTRY_CODE,
        COUNSELLOR_COUNSELLING_SUBJECT_ID,
        COUNSELLOR_HOURLY_RATE,
        COUNSELLOR_QUALIFICATION_INSTITUTE,
        COUNSELLOR_COUNSELLING_DETAILS,
        COUNSELLOR_PHOTO, COUNSELLOR_HEADLINE, COUNSELLOR_ABOUT_DESCRIPTION,
        COUNSELLOR_VIDEO_URL,
        COUNSELLOR_TIME_ZONE_CODE, COUNSELLOR_AVAILABILITY_MONDAY, COUNSELLOR_AVAILABILITY_TUESDAY, COUNSELLOR_AVAILABILITY_WEDNESDAY,
        COUNSELLOR_AVAILABILITY_THURSDAY, COUNSELLOR_AVAILABILITY_FRIDAY, COUNSELLOR_AVAILABILITY_SATURDAY,
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


    function validate(sTime, eTime, checkIndex, list) {

        var isNotOverlapping = true;
        var sTimedate = new Date();
        var eTimedate = new Date();
        var isdateTrue = true;
        var isNotSameDate = true;

        if ((sTime.includes(":")) && (eTime.includes(":"))) {

            // init date values 
            var sTime_t = sTime.split(":");
            sTimedate.setHours(parseInt(sTime_t[0]));
            sTimedate.setMinutes(parseInt(sTime_t[1]));

            var eTime_t = eTime.split(":");
            eTimedate.setHours(parseInt(eTime_t[0]));
            eTimedate.setMinutes(parseInt(eTime_t[1]));
            console.log(sTimedate);
            console.log(eTimedate);

            if (eTimedate > sTimedate) {
                isdateTrue = false;
            }
            if (sTimedate.getTime() === eTimedate.getTime()) {
                isNotSameDate = false;
            }

        }


        if (isdateTrue && isNotSameDate) {
            for (var index = 0; index < list.length; index++) {

                var item = list[index];
                // make sure same date is not checked
                if ((checkIndex != index) && (item.TO.includes(":")) && (item.FROM.includes(":"))) {
                    // init values
                    var itemFrom = item.FROM.split(":");
                    var startdate2 = new Date();
                    startdate2.setHours(parseInt(itemFrom[0]));
                    startdate2.setMinutes(parseInt(itemFrom[1]));

                    var itemTo = item.TO.split(":");
                    var enddate2 = new Date();
                    enddate2.setHours(parseInt(itemTo[0]));
                    enddate2.setMinutes(parseInt(itemTo[1]));

                    // check if dates overlap
                    if (dateRangeOverlaps(sTimedate, eTimedate, startdate2, enddate2)) {

                        isNotOverlapping = false;

                        break;
                    }
                    // function to check if dates overlap 
                    function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
                        if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
                        if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
                        if (b_start < a_start && a_end < b_end) return true; // a in b
                        return false;
                    }
                }

            }

        }
        // init result values 
        var validateObject = {
            isNotOverlapping: isNotOverlapping,
            isdateTrue: isdateTrue,
            isNotSameDate: isNotSameDate,
            results: isNotOverlapping && isdateTrue && isNotSameDate
        };
        // return values
        return validateObject;
    }

    var errorlist = [];
    if (req.path === "/createCounsellor") {
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
        }

        if (![COUNSELLOR_EMAIL].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_EMAIL", message: "No email provided" });
        } else if (!validEmail(COUNSELLOR_EMAIL)) {
            errorlist.push({ error: "COUNSELLOR_EMAIL", message: "Invalid email provided" });
        }
         
        if (![COUNSELLOR_FILES].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_FILES", message: "No file provided" });
        } else if (!COUNSELLOR_FILES) {
            errorlist.push({ error: "COUNSELLOR_FILES", message: "Invalid file provided" });
        }


        if (![COUNSELLOR_ABOUT_DESCRIPTION].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_ABOUT_DESCRIPTION", message: "No about description provided" });
        }else if (COUNSELLOR_ABOUT_DESCRIPTION.length > 150){
            errorlist.push({ error: "COUNSELLOR_ABOUT_DESCRIPTION", message: "about description not more than 150 letters" });
        }



        if (![COUNSELLOR_PHOTO].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_PHOTO", message: "No photo provided" });
        }

        if (![COUNSELLOR_HEADLINE].every(Boolean)) {
            errorlist.push({ error: "COUNSELLOR_HEADLINE", message: "No headline provided" });
        }else if (COUNSELLOR_HEADLINE.length > 150){
            errorlist.push({ error: "COUNSELLOR_HEADLINE", message: "headline not more than 30 letters" });
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
        // Monday 
        if (COUNSELLOR_AVAILABILITY_MONDAY.length > 0) {
            var list = COUNSELLOR_AVAILABILITY_MONDAY;
            for (var i = 0; i < list.length; i++) {

                console.log(list[i]);
                //check validity of date
                var validateResults = validate(list[i].TO, list[i].FROM, i, list);
                // view results and display validation results
                console.log(validateResults);
                var resultsDisplay = "your monday slots : ";
                // if (!(list[i].TO && list[i].FROM )) {

                //     errorlist.push({ error: "COUNSELLOR_AVAILABILITY_MONDAY", message: "your monday slots are missing a session timing" });
                // }

                // else 
                
                if (!(validateResults.results)) {
                    if (!(validateResults.isNotOverlapping)) {

                        resultsDisplay += "* Overlap with one another ";
                    }
                    if (!(validateResults.isdateTrue)) {

                        resultsDisplay += "* start timing is after ending time ";

                    }
                    if (!(validateResults.isNotSameDate)) {
                        resultsDisplay += "* is the same time";
                    }

                    errorlist.push({ error: "COUNSELLOR_AVAILABILITY_MONDAY", message: resultsDisplay });

                }
            }
        }


        // Tuesday 
        if (COUNSELLOR_AVAILABILITY_TUESDAY.length > 0) {
            var list = COUNSELLOR_AVAILABILITY_TUESDAY;
            for (var i = 0; i < list.length; i++) {

                console.log(list[i]);
                //check validity of date
                var validateResults = validate(list[i].TO, list[i].FROM, i, list);
                // view results and display validation results
                console.log(validateResults);
                var resultsDisplay = "your tuesday slots : ";
                // if (!(list[i].TO && list[i].FROM)) {

                //     errorlist.push({ error: "COUNSELLOR_AVAILABILITY_TUESDAY", message: "your nonday slots are missing a session timing" });
                // }

                // else 
                
                if (!(validateResults.results)) {
                    if (!(validateResults.isNotOverlapping)) {

                        resultsDisplay += "* Overlap with one another ";
                    }
                    if (!(validateResults.isdateTrue)) {

                        resultsDisplay += "* start timing is after ending time ";
                    }
                    if (!(validateResults.isNotSameDate)) {
                        resultsDisplay += "* is the same time";
                    }

                    errorlist.push({ error: "COUNSELLOR_AVAILABILITY_TUESDAY", message: resultsDisplay });

                }
            }
        }

        // Wednesday 
        if (COUNSELLOR_AVAILABILITY_WEDNESDAY.length > 0) {
            var list = COUNSELLOR_AVAILABILITY_WEDNESDAY;
            for (var i = 0; i < list.length; i++) {

                console.log(list[i]);
                //check validity of date
                var validateResults = validate(list[i].TO, list[i].FROM, i, list);
                // view results and display validation results
                console.log(validateResults);
                var resultsDisplay = "your wednesday slots : ";
                // if (!(list[i].TO && list[i].FROM)) {

                //     errorlist.push({ error: "COUNSELLOR_AVAILABILITY_WEDNESDAY", message: "your nonday slots are missing a session timing" });
                // }

                // else 
                if (!(validateResults.results)) {
                    if (!(validateResults.isNotOverlapping)) {

                        resultsDisplay += "* Overlap with one another ";
                    }
                    if (!(validateResults.isdateTrue)) {
                        resultsDisplay += "* start timing is after ending time ";
                    }
                    if (!(validateResults.isNotSameDate)) {
                        resultsDisplay += "* is the same time";
                    }
                    errorlist.push({ error: "COUNSELLOR_AVAILABILITY_WEDNESDAY", message: resultsDisplay });

                }
            }
        }


        // Thursday 
        if (COUNSELLOR_AVAILABILITY_THURSDAY.length > 0) {
            var list = COUNSELLOR_AVAILABILITY_THURSDAY;
            for (var i = 0; i < list.length; i++) {

                console.log(list[i]);
                //check validity of date
                var validateResults = validate(list[i].TO, list[i].FROM, i, list);
                // view results and display validation results
                console.log(validateResults);
                var resultsDisplay = "your thursday slots : ";
                // if (!(list[i].TO && list[i].FROM)) {
                //     errorlist.push({ error: "COUNSELLOR_AVAILABILITY_THURSDAY", message: "your nonday slots are missing a session timing" });
                // }

                // else 
                if (!(validateResults.results)) {
                    if (!(validateResults.isNotOverlapping)) {

                        resultsDisplay += "* Overlap with one another ";
                    }
                    if (!(validateResults.isdateTrue)) {

                        resultsDisplay += "* start timing is after ending time ";

                    }
                    if (!(validateResults.isNotSameDate)) {
                        resultsDisplay += "* is the same time";
                    }

                    errorlist.push({ error: "COUNSELLOR_AVAILABILITY_THURSDAY", message: resultsDisplay });

                }
            }
        }

        // Friday 
        if (COUNSELLOR_AVAILABILITY_FRIDAY.length > 0) {
            var list = COUNSELLOR_AVAILABILITY_FRIDAY;
            for (var i = 0; i < list.length; i++) {

                console.log(list[i]);
                //check validity of date
                var validateResults = validate(list[i].TO, list[i].FROM, i, list);
                // view results and display validation results
                console.log(validateResults);
                var resultsDisplay = "your friday slots : ";
                // if (!(list[i].TO && list[i].FROM)) {


                //     errorlist.push({ error: "COUNSELLOR_AVAILABILITY_FRIDAY", message: "your nonday slots are missing a session timing" });
                // }

                // else
                 if (!(validateResults.results)) {
                    if (!(validateResults.isNotOverlapping)) {

                        resultsDisplay += "* Overlap with one another ";
                    }
                    if (!(validateResults.isdateTrue)) {

                        resultsDisplay += "* start timing is after ending time ";

                    }
                    if (!(validateResults.isNotSameDate)) {
                        resultsDisplay += "* is the same time";
                    }

                    errorlist.push({ error: "COUNSELLOR_AVAILABILITY_FRIDAY", message: resultsDisplay });

                }
            }
        }


        // Satuarday 
        if (COUNSELLOR_AVAILABILITY_SATURDAY.length > 0) {
            var list = COUNSELLOR_AVAILABILITY_SATURDAY;
            for (var i = 0; i < list.length; i++) {

                console.log(list[i]);
                //check validity of date
                var validateResults = validate(list[i].TO, list[i].FROM, i, list);
                // view results and display validation results
                console.log(validateResults);
                var resultsDisplay = "your Satuarday slots : ";
                // if (!(list[i].TO && list[i].FROM)) {

                //     if (!(list[i].TO || list[i].FROM)) {
                //         errorlist.push({ error: "COUNSELLOR_AVAILABILITY_SATURDAY", message: "your saturday slots are missing a session timing" });
                //     }
                // }

                // else
                 if (!(validateResults.results)) {
                    if (!(validateResults.isNotOverlapping)) {

                        resultsDisplay += "* Overlap with one another ";
                    }
                    if (!(validateResults.isdateTrue)) {
                        resultsDisplay += "* start timing is after ending time ";
                    }
                    if (!(validateResults.isNotSameDate)) {
                        resultsDisplay += "* is the same time";
                    }
                    errorlist.push({ error: "COUNSELLOR_AVAILABILITY_SATURDAY", message: resultsDisplay });
                }
            }
        }


        if (errorlist.length > 0) {
            return res.status(401).json(errorlist);
        }
    }

    next();
};