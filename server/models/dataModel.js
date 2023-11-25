const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    content: {
      required: true,
      type: String,
    },
    owner: {
      required: true,
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Data = mongoose.model("Data", DataSchema);

module.exports = Data;
