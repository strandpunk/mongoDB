import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Chats.css";
import ScrollChat from "./ScrollableChat";

function Chats() {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const newMessageHandler = (e) => {
    setNewMessage(e.target.value);
  };

  async function sendMessage(event) {
    if (event.key === "Enter" && newMessage) {
      const data = { content: newMessage, chatId: currentChat._id };
      await axios.post("http://localhost:5000/message/", data);
      setNewMessage("");
    } else {
    }
  }

  async function getChats() {
    const chatList = await axios.get("http://localhost:5000/chat/get-chats");
    setChats(chatList.data);
  }

  function renderChats() {
    return chats.map((data, i) => {
      // content-wrapper?
      return (
        <div key={i} onClick={(e) => setCurrentChat(data)}>
          <div className="chat__card">
            <div>{data.chatName}</div>
            <div>{data.lastMessage}</div>
          </div>
        </div>
      );
    });
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
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    if (currentChat) {
      fetchMessages(currentChat._id);
    }
  }, [currentChat]);

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className="chat-wrapper">
      <div>
        {chats.length !== 0 ? (
          <>
            <div className="chat__card-wrapper">{renderChats()}</div>
          </>
        ) : (
          <>Загрузка</>
        )}
      </div>
      <div>
        {currentChat ? (
          <>
            {loading ? (
              <>загрузка чата</>
            ) : (
              <>
                {/* {" "} */}
                <div className="chat__messageBox">
                  <div>{currentChat.chatName}</div>
                  <div className="chat__messages">
                    <ScrollChat messages={messages} />
                  </div>

                  {/* {newMessage} */}
                  <div onKeyDown={sendMessage}>
                    <input
                      onChange={(e) => newMessageHandler(e)}
                      value={newMessage}
                      name="email"
                      type="text"
                      placeholder="Enter your message...."
                    />
                  </div>
                </div>

                {/* {" "} */}
              </>
            )}
          </>
        ) : (
          <>
            <div className="chat__messageBox">Выберите чат</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Chats;
