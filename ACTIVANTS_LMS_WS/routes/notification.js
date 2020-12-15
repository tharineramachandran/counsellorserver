const router = require("express").Router();
const pool = require("../database/Db_Connection");
const authorization = require("../middleware/authorization");

const notification = require("../functions/noti");


router.post("/createNoti",      async (req, res) => {
  try {
    var { userID, noti   } = req.body;
     
    await notification.addNoti(userID, noti   ); 
 
    res.status(200).json("success");

     

  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Server Error" })

  }
});

router.get("/getNoti/:id",  authorization,   async (req, res) => {
  try {
    var id = req.params.id;

    const noti = await pool.query('SELECT  * FROM "CT_NOTIFICATION" where "ct_user_id"  = $1  ',
      [parseInt (id)]); 

    res.json(noti.rows);
  } catch (error) {
    console.log(error.message);
  }
})
router.get("/getTotalNoti/:id",  authorization,  async (req, res) => {
  try {
    var id = req.params.id;
    var totalunread=0;
    const noti = await pool.query('SELECT  * FROM "CT_NOTIFICATION" where "ct_user_id"  = $1  ',
      [parseInt (id)]);
    if (noti.rowCount > 0) {  
       var value = await noti.rows[0].ct_notification.value ; 
      console.log(value);
      for ( var i = 0; i < value.length; i++) {
        if (value[i].unread == 1){
          ++totalunread;


        } }
   
      } 
    res.json(totalunread);
  } catch (error) {
    console.log(error.message);
  }
})

router.post("/read/:id",   authorization, async (req, res) => {
  try {
    const id = req.params.id;

    await notification.updateRead(id ); 
 
    res.status(200).json("success");    
 

  } catch (err) {
    console.log(["rrrrrrrrrrrrrrrrrr", err]);

  }
});


router.post("/deleteNoti/:id", authorization, async (req, res) => {
  try {
    const id = req.params.id;
     
 
      const ct_user1 = await pool.query('DELETE FROM  "CT_NOTIFICATION" where "ct_user_id"  = $1 ',
        [ parseInt(id)           ]);
         

    res.json("success");

  } catch (err) {
    console.log(["rrrrrrrrrrrrrrrrrr", err]);

  }
});

  
module.exports = router;
