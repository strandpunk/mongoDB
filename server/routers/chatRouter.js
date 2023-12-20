const router = require("express").Router();
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const auth = require("../middleware/auth");

router.post("/startChat", auth, async (req, res) => {
  try {
    const userID = req.user;
    const userInfo = await User.findById(userID).select(); //.select('-passwordHash')
    const { friendId, friendName } = req.body;
    //console.log(friendId, friendName);
    const chatName = `${userInfo.name} - ${friendName}`;

    const newChat = new Chat({
      users: [userID, friendId],
      chatName: chatName,
      lastMessage: "656408b6286044872c3e50d3",
    });

    await newChat.save();

    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.get("/get-chats", auth, async (req, res) => {
  try {
    const userID = req.user;
    const chats = await Chat.find({ users: userID });
    //console.log(chats);
    res.status(200).send(chats);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

module.exports = router;
