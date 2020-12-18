const pool = require("../database/Db_Connection");

async function addNoti(userID,noti) {
    try {
         
        const user = await pool.query('SELECT  * FROM "CT_NOTIFICATION" WHERE "ct_user_id" = $1', [parseInt(userID) ]);
        var datetime = new Date();
        if (user.rowCount > 0) {
     var existing = user.rows[0].ct_notification ;
           
           
          await existing.value.push({ "notification"  : noti , "unread" : 1  , date :datetime.toISOString().slice(0, 10) , time :datetime.toISOString().slice(11, 16) }) ;
          
            let newUser = await pool.query(
                'UPDATE   "CT_NOTIFICATION"   SET  ct_notification = ct_notification::jsonb ||  $1  ::jsonb WHERE "ct_user_id" = $2', [
                  existing   , userID]                  )
        } else {
           
        

            let newUser = await pool.query( 
                ' INSERT INTO "CT_NOTIFICATION" (ct_user_id, ct_notification) VALUES($1,     $2 ) RETURNING *', [
                userID,  {value : [{ "notification"  : noti , "unread" : 1  , date :datetime.toISOString().slice(0, 10) , time :datetime.toISOString().slice(11, 16) }]  }    ])
        }
    
    
      } catch (error) {
        console.log(error.message);
      }
}


async function updateRead(userID) {
  try {
       
      const user = await pool.query('SELECT  * FROM "CT_NOTIFICATION" WHERE "ct_user_id" = $1', [parseInt(userID) ]);
  
      if (user.rowCount > 0) {
   var existing = user.rows[0].ct_notification ;
       
        await existing.value.map(a=>a.unread=0);
       existing.value.map(a=>a.unread=0);
          let newUser = await pool.query(
              'UPDATE   "CT_NOTIFICATION"   SET  ct_notification = ct_notification::jsonb ||  $1  ::jsonb WHERE "ct_user_id" = $2', [
                existing , userID]                  )
      }  
  
   
    } catch (error) {
      console.log(error.message);
    }
}
module.exports = { addNoti ,updateRead}

 