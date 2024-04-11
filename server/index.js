const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mongoDB = require("./config/mongoDB");
const userRouter = require("./routers/userRouter");
const dataRouter = require("./routers/dataRouter");
const chatRouter = require("./routers/chatRouter");
const messageRouter = require("./routers/messageRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

// set up server

const app = express();
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server started on port: ${PORT}`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData);
    console.log(userData);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("new message", (newMessageReceived) => {
    //var chat = newMessageReceived.chatId;
    console.log(newMessageReceived);
    console.log(1);

    // if (!chat.users) return console.log("chat.users not defined");

    // chat.users.forEach((user) => {
    //   if (user._id == newMessageReceived.sender._id) return;

    socket.broadcast.emit("message received", newMessageReceived);
    // });
  });
});

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
app.use("/message", messageRouter);
