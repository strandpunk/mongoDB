const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    avatar: { type: String, required: true },
    city: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Date, required: true },
    subDate: { type: Date, required: true },
    isAdmin: { type: Boolean, required: true },
    friends: { type: Array, required: true },
    temperament: {type: String, required: true},
    hobby: {type: Array, required: true},
    lie: {type: Boolean, required: true}
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
