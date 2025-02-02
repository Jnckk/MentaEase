import React, { useState, useEffect, useRef } from "react";
import "../css/Chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";
const apiURL = `${process.env.REACT_APP_GROQ_API_URL}/groq`;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("id");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!messageInput.trim()) return;

    const userMessage = {
      text: messageInput,
      isSent: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessageInput("");

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: messageInput,
          sessionId: sessionId,
          language: selectedLanguage,
        }),
      });

      const data = await response.json();

      const aiMessage = {
        text: data.response,
        isSent: false,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Chat App</h1>
        </div>
        <ul className="user-list">
          <li>John Doe</li>
          <li>Jane Smith</li>
          <li>Bob Johnson</li>
          <li>Alice Brown</li>
        </ul>
      </div>
      <div className="chat-area">
        <div className="chat-header">
          <h2>Active Chat</h2>
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="language-selector"
          >
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.isSent ? "sentin" : "received"}`}
            >
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-area">
          <input
            type="text"
            placeholder="Type your message..."
            className="message-input"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="send-button" onClick={handleSend}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
