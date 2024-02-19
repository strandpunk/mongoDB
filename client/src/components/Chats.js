import axios from "axios";
import { useEffect, useState } from "react";
import "./Chats.css";

function Chats() {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [newMessage, setNewMessage] = useState("");

  const newMessageHandler = (e) => {
    setNewMessage(e.target.value);
  };

  async function sendMessage() {
    if (newMessage) {
      const data = { content: newMessage, chatId: currentChat };
      await axios.post("http://localhost:5000/message/", data);
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
        <div key={i} onClick={(e) => setCurrentChat(data._id)}>
          <div className="chat__card">
            <div>{data.chatName}</div>
            <div>{data.lastMessage}</div>
          </div>
        </div>
      );
    });
  }

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
            {" "}
            <div className="chat__messageBox">
              chat
              {newMessage}
              <input
                onChange={(e) => newMessageHandler(e)}
                name="email"
                type="text"
                placeholder="Enter your message...."
              />
              <button onClick={(e) => sendMessage()}>SEND</button>
            </div>{" "}
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
