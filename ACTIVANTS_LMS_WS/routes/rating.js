const router = require('express').Router();
const pool = require("../database/Db_Connection")
const authorization = require("../middleware/authorization");

const getName = require("../functions/names");
const { baseURLAPI, baseURL } = require('../Global');

  function counsellor_request_filter(counsellor_request) {
  var filtered_request = [counsellor_request.rows[0]];
  
  try{
  for (let i = 0; i < counsellor_request.rowCount; i++) { 

    
    if (counsellor_request.rows[i].ct_conselling_id ){

      
    var value = filtered_request.find(elem =>    parseInt(elem.ct_conselling_id ) === parseInt( counsellor_request.rows[i].ct_conselling_id) );

    if ( value == undefined) {
      filtered_request.push(counsellor_request.rows[i]);
    }} 
  }
  
   
  return filtered_request;}catch(error) {console.log(["eeeeeeeeeeeeee",error])}
}


 
router.post("/Delete", authorization, async (req, res) => {
  var { reviewId  } = req.body.formData;
   
   
  try {
    let newUser = await pool.query(
      'DELETE FROM  "CT_COUNSELLOR_REVIEW"  WHERE "id" = $1', [
     reviewId])
 
      res.status(200).json("success");

  } catch (error) {
      console.error(["api consellee update", error.message]);
      res.status(400).json([{ error: "An error occurred ", message: "An error occurred" }]);
  }
})


router.post("/UpdateRating", authorization, async (req, res) => {
  var { reviewId,feedback,rating,userID,cousellorID } = req.body.formData;
   
   
  try {
    let newUser = await pool.query(
      'UPDATE   "CT_COUNSELLOR_REVIEW" SET  "ct_counsellor_review" = $1 ,"ct_counsellor_stars" = $2  WHERE "id" = $3', [
    feedback,rating,reviewId])
 
      res.status(200).json("success");

  } catch (error) {
      console.error(["api consellee update", error.message]);
      res.status(400).json([{ error: "An error occurred ", message: "An error occurred" }]);
  }
})




router.post("/rating", authorization, async (req, res) => {
  var { requestID,feedback,rating,userID,cousellorID } = req.body.formData;
  
  var datetime = new Date();
  try {
    var datetime = new Date();
  await    pool.query(
          'INSERT INTO "CT_COUNSELLOR_REVIEW" (  ct_date,   ct_request_id,  ct_counsellor_review, ct_counsellor_stars, ct_counsellor_user_id, ct_counsellor_date, ct_counsellor_id  ) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',
          [       datetime.toISOString().slice(0, 10),                                      parseInt (requestID),feedback,rating,userID,datetime.toISOString().slice(0, 10),cousellorID   ]);

      res.status(200).json("success");

  } catch (error) {
      console.error(["api consellee update", error.message]);
      res.status(400).json([{ error: "An error occurred ", message: "An error occurred" }]);
  }
})



router.get("/userSent/:id", authorization, async (req, res) => {
  try {
    var id = req.params.id;

    var counsellor_request = await pool.query('SELECT  "CT_COUNSELLOR_REQUESTS"."id", "CT_COUNSELLOR_REQUESTS"."ct_session_start_time", "CT_COUNSELLOR_REQUESTS"."ct_session_end_time", "CT_COUNSELLOR_REQUESTS"."ct_session_date", "CT_COUNSELLOR_REQUESTS"."ct_user_id", "CT_COUNSELLOR_REQUESTS"."ct_counsellor_id",     "CT_COUNSELLOR_REQUESTS"."ct_conselling_id", "CT_COUNSELLOR_REQUESTS"."ct_counselling_level_code",  "CT_COUNSELLOR_REQUESTS"."ct_counsellor_hourly_rate", "CT_COUNSELLOR_REQUESTS"."ct_counselling_subject_code",     "T_USER"."TX_USER_NAME" ,"T_USER"."TX_PICTURE"     FROM public."CT_COUNSELLOR_REQUESTS" INNER JOIN public."T_USER" ON  CAST("CT_COUNSELLOR_REQUESTS"."ct_counsellor_id" AS INTEGER) = "T_USER"."ID_USER_UUID" WHERE  "CT_COUNSELLOR_REQUESTS"."ct_user_id" = $1', [id]);

    //   var counsellor_review = await pool.query('SELECT  "CT_COUNSELLOR_REVIEW"."ct_request_id",       "CT_COUNSELLOR_REVIEW"."id", "CT_COUNSELLOR_REVIEW"."ct_counsellor_review","CT_COUNSELLOR_REVIEW"."ct_counsellor_stars", "CT_COUNSELLOR_REVIEW"."ct_counsellor_date","CT_COUNSELLOR_REVIEW"."ct_counsellor_user_id" ,"T_USER"."TX_USER_NAME" ,"T_USER"."TX_PICTURE"         FROM public."CT_COUNSELLOR_REVIEW" INNER JOIN public."T_USER" ON  CAST("CT_COUNSELLOR_REVIEW"."ct_counsellor_id" AS INTEGER) = "T_USER"."ID_USER_UUID" WHERE  "CT_COUNSELLOR_REVIEW"."ct_counsellor_user_id" = $1', [id]);
    var view_counsellor_review = []


    var filtered_request =  await counsellor_request_filter(counsellor_request);
 
 if (filtered_request[0].ct_user_id){
    for (let x = 0; x < filtered_request.length; x++) {
 

      var review_request = await pool.query('SELECT * FROM "CT_COUNSELLOR_REVIEW" where "ct_counsellor_user_id" = $1   AND "ct_counsellor_id"  = $2   ', [parseInt(filtered_request[x].ct_user_id    ),parseInt(filtered_request[x].ct_counsellor_id    )]);



      var counsellingLevelName = await getName.getCounsellingLevelName(filtered_request[x].ct_counselling_level_code);
      filtered_request[x].ct_counselling_level_name = counsellingLevelName;
      var counsellingSubjectsName = await getName.getCounsellingSubjectsName(filtered_request[x].ct_counselling_subject_code);
      filtered_request[x].ct_counselling_subject_name = counsellingSubjectsName;


      if (review_request.rowCount > 0) {
        filtered_request[x].review = 1;
        filtered_request[x].review_details = review_request.rows[0];

      } else {
        filtered_request[x].review = 0;
        filtered_request[x].review_details = review_request.rows[0];
      }

      

      view_counsellor_review.push(filtered_request[x]);

    } }
    res.json(view_counsellor_review); 


  } catch (error) {
    console.log(["ddddddddddddddddddddddddd  "+error.message]);
    res.json([]); 
  }
})


router.get("/getTotalCounsellorRequests/:id", authorization, async (req, res) => {
  try {
    var id = req.params.id;

    const user = await pool.query('SELECT  *  FROM "CT_COUNSELLOR_REQUESTS"     where "CT_COUNSELLOR_REQUESTS"."ct_counsellor_id" = $1 AND "CT_COUNSELLOR_REQUESTS"."ct_counsellor_response" = $2',
      [id, '3']);

    res.json(user.rowCount);
  } catch (error) {
    console.log(error.message);
  }
})

module.exports = router;