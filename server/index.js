const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mongoDB = require("./config/mongoDB");
const userRouter = require("./routers/userRouter");
const dataRouter = require("./routers/dataRouter");
const chatRouter = require("./routers/chatRouter");
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

// connect to mongoDB

mongoDB();

// set up routes

app.use("/auth", userRouter);
app.use("/data", dataRouter);
app.use("/chat", chatRouter);
