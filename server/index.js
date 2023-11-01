const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mongoDB = require("./config/mongoDB");
const userRouter = require("./routers/userRouter");
const dataRouter = require("./routers/dataRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

// set up server

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

// multer
//importing schema
const Image = require("./models/imageModel");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/uploads", upload.single("file"), async (req, res) => {
  console.log(req.file.filename);
  const imageName = req.file.filename;

  try {
    Image.create({ image: imageName });
    res.status(200).send();
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/get-image", async (req, res) => {
  try {
    Image.find({}).then((data) => {
      res.status(200).send();
    });
  } catch (error) {
    res.status(500).send();
  }
});
// connect to mongoDB

mongoDB();

// set up routes

app.use("/auth", userRouter);
app.use("/data", dataRouter);
