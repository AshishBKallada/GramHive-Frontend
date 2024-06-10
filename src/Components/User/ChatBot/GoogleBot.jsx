import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GoogleBot = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [genAI, setGenAI] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!genAI) {
      const apiKey = "AIzaSyC5BdEjYB8nmVd5t7F0Kjrh5snzjoTnzQU";
      setGenAI(new GoogleGenerativeAI(apiKey));
    }
  }, [genAI]);

  const getResponse = async () => {
    if (!value || isLoading) return;
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      if (!chatHistory.length) {
        setChatHistory([{ role: "user", parts: ["Initial message"] }]);
      }

      chatHistory.push({ role: "user", parts: [value] });

      const chat =
        chatHistory.length > 1
          ? model.startChat({ history: chatHistory.slice(1) })
          : model.startChat();

      const result = await chat.sendMessage(value);
      const response = await result.response;
      const text = response.text();
      setChatHistory([...chatHistory, { role: "model", parts: [text] }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
      setValue("");
    }
  };

  const clear = () => {
    setChatHistory([]);
    setValue("");
    setError("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !isLoading) {
      getResponse();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {chatHistory.map((chatItem, _index) => (
          <div key={_index} className={`chat-message ${chatItem.role}`}>
            <p>{chatItem.parts}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={value}
          placeholder="Ask Bard..."
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        {!error && (
          <button onClick={getResponse} disabled={isLoading}>
            Ask
          </button>
        )}
        {error && <button onClick={clear}>Clear</button>}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default GoogleBot;
