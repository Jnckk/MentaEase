import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatBot from "./Pages/ChatBot";

const App = () => {
  return (
    <div style={{ height: "100vh" }}>
      <ChatBot />
    </div>
  );
};

export default App;