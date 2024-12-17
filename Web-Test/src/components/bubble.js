// src/Components/Bubble.js
import React from "react";
import ReactMarkdown from "react-markdown";

const Bubble = ({ text, sender }) => {
  const isUser = sender === "user";
  const bubbleClass = isUser ? "bg-primary text-white" : "bg-light text-dark";

  return (
    <div
      className={`d-flex ${
        isUser ? "justify-content-end" : "justify-content-start"
      } mb-2`}
    >
      <div
        className={`p-3 rounded-3 ${bubbleClass}`}
        style={{
          maxWidth: "60%",
          wordWrap: "break-word",
          boxShadow: isUser ? "0 0 10px rgba(0, 0, 0, 0.2)" : "none",
        }}
      >
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Bubble;
