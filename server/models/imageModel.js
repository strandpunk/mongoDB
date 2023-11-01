const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema(
  {
    image: {
      require: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
