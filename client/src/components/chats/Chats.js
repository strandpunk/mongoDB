import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Chats.css";
import ScrollChat from "./ScrollableChat";

import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

function Chats() {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/id");
        //console.log("Response data:", response.data);
        setUserId(response.data); // Установка userId после получения данных
        socket.emit("setup", response.data); // Отправка userId на сервер
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId(); // Вызов функции для получения userId

    socket = io(ENDPOINT);
    socket.on("connect", () => {
      setSocketConnected(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const newMessageHandler = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      const data = {
        content: newMessage,
        chatId: currentChat._id,
        sender: userId,
      };
      console.log(data);
      await axios.post("http://localhost:5000/message/", data);
      socket.emit("new message", data);
      setNewMessage("");

      setMessages([...messages, data]);
    }
  };

  async function getChats() {
    try {
      const chatList = await axios.get("http://localhost:5000/chat/get-chats");
      setChats(chatList.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }

  function renderChats() {
    return chats.map((data, i) => (
      <div key={i} onClick={() => setCurrentChat(data)}>
        <div className="chat__card">
          <div>{data.chatName}</div>
          <div>{data.lastMessage}</div>
        </div>
      </div>
    ));
  }

  async function fetchMessages(ChatId) {
    if (!ChatId) return;

    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/message/${ChatId}`
      );

      setMessages(data);
      setLoading(false);

      socket.emit("join chat", ChatId);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

  useEffect(() => {
    if (currentChat) {
      fetchMessages(currentChat._id);
      selectedChatCompare = currentChat;
    }
  }, [currentChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chatId
      ) {
        // Если сообщение принадлежит другому чату, вы можете выполнить соответствующие действия, например, показать уведомление.
      } else {
        // Иначе добавляем новое сообщение к текущим сообщениям чата.
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className="chat-wrapper">
      <div>
        {chats.length !== 0 ? (
          <div className="chat__card-wrapper">{renderChats()}</div>
        ) : (
          <div>Загрузка...</div>
        )}
      </div>
      <div>
        {currentChat ? (
          <div className="chat__messageBox">
            <div>{currentChat.chatName}</div>
            <div className="chat__messages">
              <ScrollChat messages={messages} />
            </div>
            <input
              onChange={(e) => newMessageHandler(e)}
              value={newMessage}
              onKeyDown={sendMessage}
              name="email"
              type="text"
              placeholder="Введите сообщение..."
            />
          </div>
        ) : (
          <div className="chat__messageBox">Выберите чат</div>
        )}
      </div>
    </div>
  );
}

export default Chats;
