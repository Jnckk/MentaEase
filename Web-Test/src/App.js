import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatBot from "./Pages/ChatBot";
import PrivacyPolicy from "./Pages/PrivacyPolicy"; // Import halaman PrivacyPolicy

const App = () => {
  return (
    <Router>
      <div style={{ height: "100vh" }}>
        <Routes>
          <Route path="/" element={<ChatBot />} /> {/* Halaman utama */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />{" "}
          {/* Halaman Privacy Policy */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
