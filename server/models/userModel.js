const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    avatar: { type: String, required: true },
    city: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    subDate: { type: Date, required: true },
    isAdmin: { type: Boolean, required: true },
    friends: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
