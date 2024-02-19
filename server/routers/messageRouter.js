const express = require("express");
//const asyncHandler = require("express-async-handler");
const auth = require("../middleware/auth");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const router = express.Router();

//добавляем новое сообщение в чат
router.post("/", auth, async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user,
    content: content,
    chat: chatId,
  };

  try {
    const message = await Message.create(newMessage);

    // message = await message.populate("sender", "name pic");
    // message = await message.populate("chat");
    // message = await User.populate(message, {
    //   path: "chat.users",
    //   select: "name pic email",
    // });
    //console.log(message);
    const filter = req.body.chatId;
    const update = { lastMessage: message._id };
    await Chat.findByIdAndUpdate(filter, update);

    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

//получаем все сообщения данного чата
router.get("/:chatId", auth, async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

module.exports = router;
