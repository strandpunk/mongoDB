import axios from "axios";
import React, { useEffect, useState } from "react";
import ScrollableFeed from "react-scrollable-feed";

const ScrollChat = ({ messages }) => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserId = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/id");
      console.log("Response data:", response.data); // Добавим вывод данных ответа
      setUserId(response.data);
    } catch (error) {
      console.error("Error fetching user ID:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  console.log("userId:", userId); // Добавим вывод userId для отслеживания изменений

  if (isLoading || userId === null) {
    return <div>Loading...</div>;
  }

  return (
    <ScrollableFeed>
      <div>
        {messages &&
          messages.map((message) => (
            <div
              style={{
                display: "flex",
                justifyContent:
                  message.sender === userId ? "flex-end" : "flex-start",
                alignItems: "center",
              }}
            >
              <div
                key={message._id}
                style={{
                  maxWidth: "300px",
                  height: "auto",
                  padding: "10px",

                  color: "black",
                  borderRadius: "20px",
                  textAlign: "justify",
                  margin: "10px",
                  backgroundColor:
                    message.sender === userId ? "lightblue" : "lightgreen",
                  wordWrap: "break-word", // Переносить длинные слова на новую строку
                }}
              >
                <div>{message.content}</div>
              </div>
            </div>
          ))}
      </div>
    </ScrollableFeed>
  );
};

export default ScrollChat;
