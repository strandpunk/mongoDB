import axios from "axios";
import { useEffect, useState } from "react";
import "./Chats.css";

function Chats() {
  const [chats, setChats] = useState([]);

  async function getChats() {
    const chatList = await axios.get("http://localhost:5000/chat/get-chats");
    setChats(chatList.data);
  }

  function renderChats() {
    return chats.map((data, i) => {
      // content-wrapper?
      return (
        <div key={i}>
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
    <div>
      {chats.length !== 0 ? (
        <>
          <div className="chat__card-wrapper">{renderChats()}</div>
        </>
      ) : (
        <>Загрузка</>
      )}
    </div>
  );
}

export default Chats;
