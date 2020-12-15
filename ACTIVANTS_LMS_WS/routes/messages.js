const router = require("express").Router();
const pool = require("../database/Db_Connection");
const authorization = require("../middleware/authorization");



router.post("/createChats", authorization, async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    var chat = [];

    let newUser = await pool.query(
      'INSERT INTO "CT_USER_CHAT" ( "ct_user1", "ct_user2", "ct_subject", "ct_latest", "ct_unread_user1","ct_unread_user2", "ct_catagory" ) VALUES ($1,$2 ,$3,$4,$5,$6,$7) RETURNING *',
      [data.user1, data.user2, data.subject, 0, 0, 1, data.catagory]
    );
    chat = newUser.rows[0];

    let newMessage = await pool.query(
      'INSERT INTO "CT_USER_MESSAGES" ("ct_message","ct_sender","ct_receiver","ct_chatid","ct_order","ct_date" ) VALUES ($1,$2,$3,$4,$5,$6 ) RETURNING *',
      [data.message, data.user1, data.user2, chat.id, 1, new Date()]
    );

    res.status(200).json({ chat: chat })

  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Server Error" })

  }
});


router.post("/createMessages", authorization, async (req, res) => {
  try {
    const data = req.body;
    const message = await pool.query('SELECT * FROM "CT_USER_MESSAGES" WHERE "ct_chatid" = $1', [
      data.chatID
    ]);
    var order = await message.rowCount + 1;
    console.log(order);
    let newMessage = await pool.query(
      'INSERT INTO "CT_USER_MESSAGES" ("ct_message","ct_sender","ct_receiver","ct_chatid","ct_order" ,"ct_date") VALUES ($1,$2,$3,$4,$5 ,$6) RETURNING *',
      [data.message, data.userID, data.receiverID, data.chatID, order, new Date()]
    );

    const chatunread = await pool.query('SELECT * FROM "CT_USER_CHAT" WHERE "id" = $1', [
      data.chatID
    ]);

    if (parseInt(chatunread.rows[0].ct_user1) == parseInt(data.userID)) {
      const messagde = await pool.query('UPDATE "CT_USER_CHAT" SET "ct_unread_user2" = $1 WHERE "id" = $2',
        [1, data.chatID]);

    } else {
      const messagde = await pool.query('UPDATE "CT_USER_CHAT" SET "ct_unread_user1" = $1 WHERE "id" = $2',
        [1, data.chatID]);

    }

    chat = newMessage.rows[0];
    res.json({ chat: chat })

  } catch (err) {
    console.log(["rrrrrrrrrrrrrrrrrr", err]);

  }
});

router.get("/getMessages/:id", authorization, async (req, res) => {
  try {
    var id = req.params.id;

    const chats1 = await pool.query('SELECT  * FROM "CT_USER_MESSAGES" where "ct_chatid"  = $1  ',
      [id]);


    res.json(chats1.rows);
  } catch (error) {
    console.log(error.message);
  }
})


router.post("/read/:id", authorization, async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    console.log(req.body);
    const chatunread = await pool.query('SELECT * FROM "CT_USER_CHAT" WHERE "id" = $1', [
      data.chatID
    ]);

    if (parseInt(chatunread.rows[0].ct_user1) == parseInt(data.userID)) {
      const messagde = await pool.query('UPDATE "CT_USER_CHAT" SET "ct_unread_user1" = $1 WHERE "id" = $2',
        [0, data.chatID]);

    } else {
      const messagde = await pool.query('UPDATE "CT_USER_CHAT" SET "ct_unread_user2" = $1 WHERE "id" = $2',
        [0, data.chatID]);

    }


    res.json(chatunread);

  } catch (err) {
    console.log(["rrrrrrrrrrrrrrrrrr", err]);

  }
});


router.get("/TotalUnread/:id", authorization, async (req, res) => {
  try {
    const id = req.params.id;
     
 
      const ct_user1 = await pool.query('SELECT * FROM  "CT_USER_CHAT"  WHERE "ct_user1" = $1 AND ct_unread_user1 = $2',
        [ parseInt(id) ,   1           ]);
        const ct_user2 = await pool.query('SELECT * FROM  "CT_USER_CHAT"  WHERE "ct_user2" = $1 AND ct_unread_user2 = $2',
        [ parseInt(id) ,   1           ]);

    res.json(ct_user1.rowCount+ ct_user2.rowCount);

  } catch (err) {
    console.log(["rrrrrrrrrrrrrrrrrr", err]);

  }
});







router.get("/getTotalChats/:id", authorization, async (req, res) => {
  try {
    var id = req.params.id;

    const chats1 = await pool.query('SELECT   *    FROM "CT_USER_CHAT"   where "CT_USER_CHAT"."ct_user2" = $1  ',
      [id]);
    const chats2 = await pool.query('SELECT  *    FROM "CT_USER_CHAT" where "CT_USER_CHAT"."ct_user1" = $1  ',
      [id]);
    var chats1chats = chats1.rowCount;
    var chats2chats = chats2.rowCount;

    res.json(chats1chats + chats2chats);
  } catch (error) {
    console.log(error.message);
  }
})



router.get("/getChats/:id", authorization, async (req, res) => {
  try {
    var id = req.params.id;

    const chats1 = await pool.query('SELECT      ct_catagory ,id,ct_subject, ct_latest ,ct_unread_user2, ct_user1, ct_user2, "TX_USER_NAME", "ID_USER_UUID",   "TX_PICTURE"   ,     "TX_USER_EMAIL" FROM "CT_USER_CHAT" INNER JOIN "T_USER" ON CAST("CT_USER_CHAT"."ct_user1" AS int) = "T_USER"."ID_USER_UUID" where "CT_USER_CHAT"."ct_user2" = $1  ',
      [id]);
    const chats2 = await pool.query('SELECT ct_catagory,id,ct_subject, ct_latest ,ct_unread_user1, ct_user1, ct_user2, "TX_USER_NAME", "ID_USER_UUID", "TX_PICTURE"   ,"TX_USER_EMAIL" FROM "CT_USER_CHAT" INNER JOIN "T_USER" ON CAST("CT_USER_CHAT"."ct_user2" AS int) = "T_USER"."ID_USER_UUID" where "CT_USER_CHAT"."ct_user1" = $1  ',
      [id]);
    var chats1chats = chats1.rows;
    var chats2chats = chats2.rows;

    res.json(chats2chats.concat(chats1chats));
  } catch (error) {
    console.log("SDFGSDFG"+error.message);
  }
})

module.exports = router;
