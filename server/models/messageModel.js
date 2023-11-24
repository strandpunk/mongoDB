const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    readBy: { type: Array, required: true },
    sender: { type: mongoose.Types.ObjectId, ref: "User", require: true },
    content: { type: String, require: true },
    chat: { type: mongoose.Types.ObjectId, ref: "Chat", require: true },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("message", MessageSchema);

module.exports = Message;
