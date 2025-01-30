import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatBot from "./Pages/ChatBot";
import PrivacyPolicy from "./Pages/PrivacyPolicy";

const App = () => {
  return (
    <Router>
      <div style={{ height: "100vh" }}>
        <Routes>
          <Route path="/" element={<ChatBot />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
