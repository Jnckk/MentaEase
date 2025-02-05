import React, { useState, useEffect, useRef } from "react";
import "../css/Chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";
import { checkAuth } from "../../utils/auth";

const apiURL = `${process.env.REACT_APP_GROQ_API_URL}/groq`;
const historySaveURL = `${process.env.REACT_APP_GROQ_API_URL}/history/save`;
const historyListURL = `${process.env.REACT_APP_GROQ_API_URL}/history/list`;
const historyDetailURL = `${process.env.REACT_APP_GROQ_API_URL}/history/detail`;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("id");
  const [userEmail, setUserEmail] = useState("");
  const [historyList, setHistoryList] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setSessionId(uuidv4());

    const fetchUser = async () => {
      const auth = await checkAuth();
      if (auth.user) {
        setUserEmail(auth.user.email);
        fetchHistory(auth.user.email);
      }
    };

    fetchUser();

    const intervalId = setInterval(() => {
      if (userEmail) {
        fetchHistory(userEmail);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [userEmail]);

  const fetchHistory = async (email) => {
    try {
      const response = await fetch(`${historyListURL}/${email}`);
      const data = await response.json();
      setHistoryList(data.history);
    } catch (error) {
    }
  };

  const fetchHistoryDetail = async (email, sessionId) => {
    try {
      const response = await fetch(`${historyDetailURL}/${email}/${sessionId}`);
      const data = await response.json();

      if (Array.isArray(data.messages) && data.messages.length > 0) {
        const allMessages = data.messages.flatMap(
          (history) => history.messages || []
        );
        setMessages(allMessages);
      } else {
        setMessages([]);
      }
    } catch (error) {
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveChatHistory = async (messages) => {
    if (!userEmail || !sessionId) return;

    try {
      await fetch(historySaveURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          sessionId: sessionId,
          messages: messages,
        }),
      });

    } catch (error) {
    }
  };

  const handleSend = async () => {
    if (!messageInput.trim()) return;

    const userMessage = {
      role: "user",
      content: messageInput,
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
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => {
        const updatedMessages = [...prev, aiMessage];
        saveChatHistory(updatedMessages);
        return updatedMessages;
      });
    } catch (error) {
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

  const handleHistoryClick = (sessionId) => {
    setSessionId(sessionId);
    fetchHistoryDetail(userEmail, sessionId);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Chat History</h1>
        </div>
        <ul className="user-list">
          {historyList.length > 0 ? (
            historyList.map((history) => (
              <li
                key={history.sessionId}
                className="history-item"
                onClick={() => handleHistoryClick(history.sessionId)}
              >
                {history.header}
              </li>
            ))
          ) : (
            <li className="no-history">Belum ada history</li>
          )}
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
              className={`message ${
                message.role === "user" ? "sentin" : "received"
              }`}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
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
