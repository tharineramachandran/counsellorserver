const express = require("express");
const app = express();
const cors = require("cors");
const pool = require('./database/Db_Connection');
 
const email = require('./functions/email');
const socialAuth = require("./routes/socialAuth");
const profileAuth = require("./routes/profileAuth");
const passport = require("passport");
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const cookieParser = require("cookie-parser"); 
require('./config/passportSetup');
const fs = require('fs'); 
var open = require('open');
const { options } = require("./routes/socialAuth");
const bodyParser = require('body-parser');

//app.use(cors()); 
app.use(express.json({limit: '500mb'})); 
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}))
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
})
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);


app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 50000 }))



//routes


app.use("/password", require("./routes/password"));
app.use("/messages", require("./routes/messages"));
app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/socialauth", socialAuth);
app.use("/profile", profileAuth)
app.use("/Counsellor", require("./routes/counsellor"));
app.use("/Counsellee", require("./routes/counsellee"));
app.use("/emailVerify", require("./routes/emailVerify"));
app.use("/request", require("./routes/request"));
app.use("/session", require("./routes/session"));
app.use("/counsellorSocialAuth", require("./routes/counsellorSocialAuth"));

 
//get All counsellor
app.get("/user/:id", async (req, res) => {
  try { 
var   userId   = req.params.id; 
const user = await pool.query('SELECT "TX_VERIFICATION_STATUS" , "TX_PICTURE", "IS_COUNSELLOR" , "ID_USER_UUID" , "TX_USER_EMAIL" , "TX_USER_NAME"   ,"TX_VERIFICATION_STATUS"   FROM "T_USER" WHERE "ID_USER_UUID" = $1', [userId]);


    res.json({
      user : user.rows[0]
    })

  } catch (error) {
    console.log(["----------ssssssssssssssssssssssssss------------",error.message]);
  }
})



//get All counsellor
app.get("/form/list", async (req, res) => {
  try {
    const allCountries = await pool.query('SELECT * FROM "CT_COUNTRY"');
    const allInstitutes = await pool.query('SELECT * FROM "CT_INSTITUTE"');
    const allQualifications = await pool.query('SELECT * FROM "CT_QUALIFICATION"');
    const allCounsellingSubjects = await pool.query('select * from "CT_COUNSELLING_SUBJECT"');
    const allCounsellingLevel = await pool.query('select * from "CT_COUNSELLING_LEVEL"');
    res.json({
      COUNTRIES: allCountries.rows,
      INSTITUTES: allInstitutes.rows,
      QUALIFICATIONS: allQualifications.rows,
      COUNSELLING_SUBJECTS: allCounsellingSubjects.rows,
      COUNSELLING_LEVELS: allCounsellingLevel.rows
    })

  } catch (error) {
    console.log(["------------dddddd-------------",error.message]);
  }
})


// Add event 
app.post("/email", async  (req, res) => {
  try {

    const nodemailer = require("nodemailer");

    let transporter = nodemailer.createTransport({
      host: 'smtp.googlemail.com', // Gmail Host
      port: 465, // Port
      secure: true, // this is true as port is 465
      auth: {
          user: 'counsellorapp49@gmail.com', // generated ethereal user
          pass: 'Red12!@12', // generated ethereal password
      },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
      from: 'counsellorapp49@gmail.com', // sender address
      to: "clairespades@gmail.com", // list of receivers
      subject: "Welcome Email", // Subject line
      //text: "Hello world?", // plain text body
      html: "This email is sent through <b>GMAIL SMTP SERVER</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);


  } catch (error) {
    console.log(["-----------eeeeeeeeeeee--------------",error.message]);
  }
})



// Add event 
app.post("/upload",   async (req, res) => {
  try { 
    const AWS = require('aws-sdk')
  //  AWS.config.update({  accessKeyId: keys.awsS3.accessKeyId, secretAccessKey: keys.awsS3.secretAccessKey   });
    
    const s3 = new AWS.S3({
      accessKeyId: keys.awsS3.accessKeyId, secretAccessKey: keys.awsS3.secretAccessKey  
  });
var file =   req.body.file; 


buf = Buffer.from(file ,'base64')
var data = { 
  Body: buf,
  Key: 'drt' ,
  Bucket:   'counsellorverify',
   
};
s3.upload(data, function(err, data){
    if (err) { 
      console.log(err);
      console.log('Error uploading data: ', data); 
    } else {
      console.log('successfully uploaded the image!');
    }
});
   
  } catch (error) {
    console.log(["-----------S3 upload Error--------------",error.message]);
  }
})




 

app.get("/openLink/:id", async (req, res) => {
  var id = req.params.id;

  open( "https://meet.google.com/"+id );
 

});

// Add event 
app.post("/addevent",  async (req, res) => {
  try {
 
console.log ("----------------------------------------------------------------");
    console.log(req.body); 
    var {  session,date ,userId,counsellorId,sessionDetails } = req.body;
 /// Date time things  
 
var datestr = date.split("T");

var datestr3 = datestr[0].split("-");
console.log(datestr3);
var day = (parseInt(datestr3[2])+1).toString();
console.log(day);
var startDate =  datestr3[0]+"-"+ datestr3[1]+"-"+day+"T"+sessionDetails.ct_from+":00.000+08:00";


var endDate =  datestr3[0]+"-"+ datestr3[1]+"-"+day+"T"+sessionDetails.ct_to+":00.000+08:00";
  console.log(["------------------------------",startDate ]);   
 const counsellor =  await pool.query('select "TX_USER_NAME","TX_USER_EMAIL" from "T_USER" where "ID_USER_UUID" = $1 ',[counsellorId]);
 const user = await pool.query('select "TX_USER_NAME","TX_USER_EMAIL" from "T_USER" where "ID_USER_UUID" = $1 ',[userId]);
 console.log([user.rows[0].TX_USER_NAME ]);   
 console.log([counsellor.rows[0].TX_USER_NAME ]);   
 var subject = "new session request";
var message = await "Dear "+counsellor.rows[0].TX_USER_NAME+" ,you have received a new session request from "+user.rows[0].TX_USER_NAME+","+ user.rows[0].TX_USER_EMAIL+" on "+startDate+" to "+endDate;     
await  email.sendEmail(counsellor.rows[0].TX_USER_EMAIL ,subject,message)  ;

 console.log([counsellor.rows[0].TX_USER_EMAIL ,subject,message 




]);   
pool.query(
  'INSERT INTO "CT_COUNSELLOR_REQUESTS" (    ct_session_start_time, ct_session_end_time, ct_session_date,ct_user_id,ct_counsellor_id, ct_counsellor_timezone_code ,ct_counsellor_response  ) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',
  [startDate   ,endDate,startDate               ,userId,counsellorId,   sessionDetails.ct_counsellor_timezone_code ,'3'      ]);

    // // Load client secrets from a local file.
    // fs.readFile('credentials.json', (err, content) => {
    //   if (err) return console.log('Error loading client secret file:', err);
    //   // Authorize a client with credentials, then call the Google Calendar API.
    //     authorize(JSON.parse(content), addEvents );
    // });

    res.status(200).json({
      message: "Request is sent"
    })

  } catch (error) {
    console.log(error.message);
  }
})
 
app.listen(5000, () => {
  console.log("server started...")
})