import axios from "axios";
import React, { useEffect, useState } from "react";
import ScrollableFeed from "react-scrollable-feed";

const ScrollChat = ({ messages }) => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserId = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/id");
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

  if (isLoading || userId === null) {
    return <div>Loading...</div>;
  }

  return (
    <ScrollableFeed>
      <div>
        {messages &&
          messages.map((message, index) => (
            <div
              key={index} // Используем индекс в качестве ключа
              style={{
                display: "flex",
                justifyContent:
                  message.sender === userId ? "flex-end" : "flex-start",
                alignItems: "center",
              }}
            >
              <div
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
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
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
