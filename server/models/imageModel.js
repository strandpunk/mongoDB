const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema(
  {
    image: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
