const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    users: { type: Array, required: true },
    chatName: { type: String, required: true },
    lastMessage: {
      type: mongoose.Types.ObjectId,
      ref: "Message",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("chat", ChatSchema);

module.exports = Chat;
