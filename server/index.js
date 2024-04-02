const express = require("express");
const https = require("https");
const fs = require("fs");
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

// Загрузка SSL сертификата и приватного ключа
const options = {
  key: fs.readFileSync("./certificates/private.key"),
  cert: fs.readFileSync("./certificates/certificate.pem")
};

// Установка HTTPS сервера
const app = express();
const PORT = process.env.PORT || 5000;
const server = https.createServer(options, app);

server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["https://localhost:3000",  'https://192.168.56.1:3000'],
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
    console.log(newMessageReceived);
    console.log(1);

    socket.broadcast.emit("message received", newMessageReceived);
  });
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://localhost:3000",  'https://192.168.56.1:3000'],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

// Подключение к MongoDB
mongoDB();

// Настройка маршрутов
app.use("/auth", userRouter);
app.use("/data", dataRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);
