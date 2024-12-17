// src/pages/ChatBot.js
import React, { useState, useEffect, useRef } from "react";
import { Button, Form, InputGroup, Card } from "react-bootstrap";
import axios from "axios";
import Bubble from "../components/bubble.js";
import AppNavbar from "../components/navbar.js";
import AppSidebar from "../components/sidebar.js";
import { v4 as uuidv4 } from "uuid";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(uuidv4());
  const [language] = useState("id");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_GROQ_API_URL}/groq`,
        {
          prompt: input,
          sessionId,
          language,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const botReply = response.data;
      setMessages([...newMessages, { text: botReply, sender: "bot" }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { text: "Maaf, terjadi kesalahan.", sender: "bot" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <AppSidebar />

      <div className="d-flex flex-column flex-grow-1">
        <AppNavbar />

        <Card
          className="flex-grow-1"
          style={{
            overflowY: "auto",
            marginBottom: "0px",
            flex: 1,
          }}
        >
          <Card.Body className="d-flex flex-column" style={{ height: "100%" }}>
            <div
              className="chat-box flex-grow-1"
              style={{
                overflowY: "auto",
                height: "100%",
              }}
            >
              {messages.map((msg, index) => (
                <Bubble key={index} text={msg.text} sender={msg.sender} />
              ))}
              <div ref={messagesEndRef} />
              {isTyping && (
                <div className="d-flex justify-content-start mb-2">
                  <div
                    className="p-2 rounded-3 bg-light text-dark"
                    style={{ maxWidth: "70%", wordWrap: "break-word" }}
                  >
                    <i>Mengetik...</i>
                  </div>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>

        <Card
          style={{
            border: "none",
            marginTop: "auto",
          }}
        >
          <Card.Body>
            <InputGroup
              className="mt-3"
              style={{
                position: "sticky",
                bottom: 0,
              }}
            >
              <Form.Control
                type="text"
                placeholder="Tanya saya..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button variant="primary" onClick={handleSendMessage}>
                Send
              </Button>
            </InputGroup>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ChatBot;
