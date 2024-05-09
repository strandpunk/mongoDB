import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import "./Chats.scss";
import ScrollChat from "./ScrollableChat";

const ENDPOINT = "http://localhost:5000";

function Chats() {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/id");
        setUserId(response.data);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchData();

    const newSocket = io(ENDPOINT);
    newSocket.on("connect", () => {
      console.log("Socket connected");
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/chat/get-chats");
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    if (currentChat) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/message/${currentChat._id}`);
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();

      if (socket) {
        socket.emit("join chat", currentChat._id);
      }
    }
  }, [currentChat, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("message received", (newMessageReceived) => {
        if (currentChat && newMessageReceived.chatId === currentChat._id) {
          setMessages(prevMessages => [...prevMessages, newMessageReceived]);
        }
      });
    }
  }, [currentChat, socket]);

  const handleChatClick = (chat) => {
    setCurrentChat(chat);
  };

  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    if (e.key === "Enter" && newMessage && currentChat) {
      const data = {
        content: newMessage,
        chatId: currentChat._id,
        sender: userId,
      };

      try {
        await axios.post("http://localhost:5000/message/", data);
        setNewMessage("");
        setMessages([...messages, data]);

        if (socket) {
          socket.emit("new message", data);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const renderChats = () => {
    return chats.map((chat, index) => (
      <div key={index} onClick={() => handleChatClick(chat)}>
        <div className="chat__card">
          <div>{chat.chatName}</div>
          {/* <div>{chat.lastMessage}</div> */}
        </div>
      </div>
    ));
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-menu">
        <div>
          {chats.length !== 0 ? (
            <div className="chat__card-wrapper">{renderChats()}</div>
          ) : (
            <div>У вас пока нет активных чатов</div>
          )}
        </div>
        <div>
          {currentChat ? (
            <div className="chat__messageBox">
              <div>{currentChat.chatName}</div>
              <div className="chat__messages">
                <ScrollChat messages={messages} />
              </div>
              <textarea
                onChange={handleNewMessageChange}
                value={newMessage}
                onKeyDown={handleSendMessage}
                name="email"
                type="text"
                placeholder="Введите сообщение..."
                className="chat__input"
              />
            </div>
          ) : (
            <div className="chat__messageBox">Выберите чат</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chats;
