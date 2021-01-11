const router = require("express").Router();
const pool = require("../database/Db_Connection");
const authorization = require("../middleware/authorization");

const getName = require("../functions/names");
const { baseURLAPI, baseURL } = require("../Global");

const awsS3 = require("../functions/awsS3");

function calendarDisplay(
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday
) {
  const date = new Date();
  const today = date.getDate();
  const dayOfTheWeek = date.getDay();
  //const sundayDate =new Date(    date.setDate(today - dayOfTheWeek ));
  const mondayDate = new Date(date.setDate(today - dayOfTheWeek + 1));
  const tuesdayDate = new Date(date.setDate(today - dayOfTheWeek + 2));
  const wednesdayDate = new Date(date.setDate(today - dayOfTheWeek + 3));
  const thusdayDate = new Date(date.setDate(today - dayOfTheWeek + 4));
  const fridayDate = new Date(date.setDate(today - dayOfTheWeek + 5));
  const saturdayDate = new Date(date.setDate(today - dayOfTheWeek + 6));
  var display = [];

  monday.forEach(calendarEdit, {
    Date: mondayDate,
    Day: "Monday",
    Color: "#e04a4a",
  });
  tuesday.forEach(calendarEdit, {
    Date: tuesdayDate,
    Day: "Tuesday",
    Color: "#f27522   ",
  });
  wednesday.forEach(calendarEdit, {
    Date: wednesdayDate,
    Day: "Wednesday",
    Color: "#fbbd08",
  });
  thursday.forEach(calendarEdit, {
    Date: thusdayDate,
    Day: "Thursday",
    Color: "#64cf7d",
  });
  friday.forEach(calendarEdit, {
    Date: fridayDate,
    Day: "Friday",
    Color: "#31c3bd",
  });
  saturday.forEach(calendarEdit, {
    Date: saturdayDate,
    Day: "Saturday",
    Color: "#2285d0",
  });

  function calendarEdit(item, index) {
    var obj = this.valueOf();
    var date = new Date(obj.Date).toISOString();
    var st = date.split("T");
    var stDF = item.ct_from.split(":");
    let str = st[0] + "T" + stDF[0] + ":" + stDF[1] + ":00";

    var endstDF = item.ct_to.split(":");
    let endstr = st[0] + "T" + endstDF[0] + ":" + endstDF[1] + ":00";

    var obj = {
      title: " ",
      start: str,
      end: endstr,
      startStr: obj.Day,
      color: obj.Color,
      editable: false,
      resourceEditable: false,
      //    extendedProps: { element: item }
    };
    display.push(obj);
  }
  return display;
}
 
router.get("/getVerificationDocuments/:id", async (req, res) => {
   
  var CT_COUNSELLOR_ID = req.params.id;
  var object = {}; 
  const user = await pool.query(
    'SELECT  * FROM "CT_COUNSELLOR_DETAILS" WHERE "CT_COUNSELLOR_ID" = $1',
    [CT_COUNSELLOR_ID]
  );
  try {
    if (user.rowCount > 0) {
      var item = user.rows[0].CT_COUNSELLOR_VERIFY;
 
      object = await awsS3.getFromS3(
        item,
        "counsellorverifydocuments",
        user.rows[0].CT_FIRST_NAME + user.rows[0].CT_LAST_NAME
      );
    }
    if (object.result) {
      res.status(200).json(object.url);
    } else {
      res.status(400).json("an error occured");
    }
  } catch (error) {
    console.error(["api consellor", error.message]);
    res
      .status(400)
      .json([{ error: "An error occurred ", message: "An error occurred" }]);
  }
});

router.post("/UpdateDetails", authorization, async (req, res) => {
  var { COUNSELLOR_FILES } = req.body.formData;
  var CT_COUNSELLOR_ID = req.body.COUNSELLORID;

  var object = {};
  const user = await pool.query(
    'SELECT  * FROM "CT_COUNSELLOR_DETAILS" WHERE "CT_COUNSELLOR_ID" = $1',
    [CT_COUNSELLOR_ID]
  );
  try {
    if (user.rowCount > 0) {
      await awsS3.deleteFromS3(
        "counsellorverifydocuments",
        user.rows[0].CT_COUNSELLOR_VERIFY
      );

      var uploadtoS3 = false;
      var filestring = [];

      for (i = 0; i < COUNSELLOR_FILES.length; i++) {
        var file = COUNSELLOR_FILES[i];
        file.name =
        CT_COUNSELLOR_ID + "-" + Math.floor(Math.random() * (1000000 - 1) + 1);
        filestring.push(file.name);
      }

      if (user.rows.length == 1 && COUNSELLOR_FILES.length > 0) {
        uploadtoS3 = await awsS3.uploadtoS3(
          COUNSELLOR_FILES,
          "counsellorverifydocuments"
        );

        const updatedUser = pool.query(
          'UPDATE   "CT_COUNSELLOR_DETAILS" SET  "CT_COUNSELLOR_VERIFY" = $1   WHERE "CT_COUNSELLOR_ID" = $2',
          [filestring[0].toString(), CT_COUNSELLOR_ID ]
        );}
       
     
    }
 res.status(200).json("success");
    
  } catch (error) {
 
    res.status(400).json([{ error: "An error occurred ", message: "An error occurred" }]);
  }
});

router.get("/getCounsellors", authorization, async (req, res) => {
  
  var final_details = [];
  try {
    const user = await pool.query('SELECT  * FROM "CT_COUNSELLOR_DETAILS"  ');

    if (user.rowCount > 0) {
      var details = user.rows;

      for (let i = 0; i < details.length; i++) {
        var item = details[i].CT_COUNSELLOR_ID;
        
        var counsellor_details = details[i];
        var counsellor_review = await pool.query(
          'SELECT  "CT_COUNSELLOR_REVIEW"."ct_request_id","CT_COUNSELLOR_REVIEW"."ct_date"    ,   "CT_COUNSELLOR_REVIEW"."id", "CT_COUNSELLOR_REVIEW"."ct_counsellor_review","CT_COUNSELLOR_REVIEW"."ct_counsellor_stars", "CT_COUNSELLOR_REVIEW"."ct_counsellor_date","CT_COUNSELLOR_REVIEW"."ct_counsellor_user_id" ,"T_USER"."TX_USER_NAME" ,"T_USER"."TX_PICTURE"         FROM public."CT_COUNSELLOR_REVIEW" INNER JOIN public."T_USER" ON  CAST("CT_COUNSELLOR_REVIEW"."ct_counsellor_user_id" AS INTEGER) = "T_USER"."ID_USER_UUID" WHERE  "CT_COUNSELLOR_REVIEW"."ct_counsellor_id" = $1',
          [item]
        );

        var counselling_details = await pool.query(
          'SELECT * FROM "CT_COUNSELLOR_COUNSELLING_DETAILS" where "ct_counsellor_id" = $1',
          [item]
        );
        var counselling_introduction = await pool.query(
          'SELECT * FROM "CT_COUNSELLOR_INTRODUCTION" where "ct_counsellor_id" = $1',
          [item]
        );

        var counselling_monday = await pool.query(
          'SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_MONDAY" where "ct_counsellor_id" = $1',
          [item]
        );
        var counselling_tuesday = await pool.query(
          'SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_TUESDAY" where "ct_counsellor_id" = $1',
          [item]
        );
        var counselling_wednesday = await pool.query(
          'SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_WEDNESDAY" where "ct_counsellor_id" = $1',
          [item]
        );
        var counselling_thursday = await pool.query(
          'SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_THURSDAY" where "ct_counsellor_id" = $1',
          [item]
        );
        var counselling_friday = await pool.query(
          'SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_FRIDAY" where "ct_counsellor_id" = $1',
          [item]
        );
        var counselling_saturday = await pool.query(
          'SELECT * FROM "CT_COUNSELLOR_AVAILABILITY_SATURDAY" where "ct_counsellor_id" = $1',
          [item]
        );

        var counselling_education = await pool.query(
          'SELECT * FROM "CT_COUNSELLOR_QUALIFICATION_INSTITUTE" where "ct_counsellor_id" = $1',
          [item]
        );

        var counselling_edu_values = [];

        var counselling_total_review = 0;
        for (let x = 0; x < counsellor_review.rowCount; x++) {
          counselling_total_review += parseInt(
            counsellor_review.rows[x].ct_counsellor_stars
          );
        }

        var counselling_average_review =
          counselling_total_review / counsellor_review.rowCount;

        for (let x = 0; x < counselling_education.rowCount; x++) {
          var instituteName = await getName.getInstituteName(
            counselling_education.rows[x].ct_institute_code
          );
          counselling_education.rows[x].ct_institute_name = instituteName;

          var qualificationName = await getName.getQualificationsName(
            counselling_education.rows[x].ct_qualification_code
          );
          counselling_education.rows[
            x
          ].ct_qualification_name = qualificationName;

          counselling_edu_values.push(counselling_education.rows[x]);
        }

        var counselling_details_values = [];
        var counselling_total_price = 0;

        for (let x = 0; x < counselling_details.rowCount; x++) {
          var counsellingLevelName = await getName.getCounsellingLevelName(
            counselling_details.rows[x].ct_counselling_level_code
          );
          counselling_details.rows[
            x
          ].ct_counselling_level_name = counsellingLevelName;
          var counsellingSubjectsName = await getName.getCounsellingSubjectsName(
            counselling_details.rows[x].ct_counselling_subject_code
          );
          counselling_details.rows[
            x
          ].ct_counselling_subject_name = counsellingSubjectsName;
          counselling_details_values.push(counselling_details.rows[x]);

          counselling_total_price += parseInt(
            counselling_details.rows[x].ct_counsellor_hourly_rate
          );
        }

        var view_counsellor_review = [];

        for (let x = 0; x < counsellor_review.rowCount; x++) {
          var review_request = await pool.query(
            'SELECT * FROM "CT_COUNSELLOR_REQUESTS" where "id" = $1',
            [counsellor_review.rows[x].ct_request_id]
          );
          var counsellingLevelName = await getName.getCounsellingLevelName(
            review_request.rows[0].ct_counselling_level_code
          );
          counsellor_review.rows[
            x
          ].ct_counselling_level_name = counsellingLevelName;
          var counsellingSubjectsName = await getName.getCounsellingSubjectsName(
            review_request.rows[0].ct_counselling_subject_code
          );
          counsellor_review.rows[
            x
          ].ct_counselling_subject_name = counsellingSubjectsName;
          view_counsellor_review.push(counsellor_review.rows[x]);
        }

        var counselling_average_price =
          counselling_total_price / counselling_details.rowCount;
        var counselling_average_review =
          counselling_total_review / counsellor_review.rowCount;

        var calendar = await calendarDisplay(
          counselling_monday.rows,
          counselling_tuesday.rows,
          counselling_wednesday.rows,
          counselling_thursday.rows,
          counselling_friday.rows,
          counselling_saturday.rows
        );

        var account = {
          counsellor_details: [counsellor_details],

          counsellor_review: view_counsellor_review,
          counselling_details: counselling_details_values,
          counselling_introduction: counselling_introduction.rows,
          counselling_education: counselling_edu_values,
          counselling_monday: counselling_monday.rows,
          counselling_tuesday: counselling_tuesday.rows,
          counselling_wednesday: counselling_wednesday.rows,
          counselling_thursday: counselling_thursday.rows,
          counselling_friday: counselling_friday.rows,
          counselling_saturday: counselling_saturday.rows,
          counselling_average_review: Math.floor(counselling_average_review),
          counselling_average_price: Math.floor(counselling_average_price),
          counselling_total_review: counsellor_review.rowCount,
          calendar: calendar,
        };

        final_details.push(account);
      }
    }
  } catch (error) {
    console.error(["api consellor", error.message]);
  }
  res.json({ counsellor: final_details });
});

router.post("/update", authorization, async (req, res) => {
  var { counsellorID, response } = req.body.formData;

  try {
    const user = await pool.query(
      'SELECT  * FROM "CT_COUNSELLOR_DETAILS" WHERE "CT_COUNSELLOR_ID" = $1',
      [counsellorID]
    );

    if (user.rowCount > 0) {
      let newUser = await pool.query(
        'UPDATE   "CT_COUNSELLOR_DETAILS"   SET "CT_COUNSELLOR_VERIFIED" =  $1  WHERE "CT_COUNSELLOR_ID" = $2',
        [response, counsellorID]
      );
    }
    res.status(200).json("success");
  } catch (error) {
    console.error(["api consellor", error.message]);
    res
      .status(400)
      .json([{ error: "An error occurred ", message: "An error occurred" }]);
  }
});

module.exports = router;