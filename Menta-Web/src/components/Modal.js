import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/css/Modal.css";

const Modal = ({ show, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsModalOpen(show);
  }, [show]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className={`modal ${isModalOpen ? "show" : ""}`}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={handleModalClose}>
            &times;
          </span>
          <h2>Login Required</h2>
        </div>
        <div className="modal-body">
          <p>Silakan login terlebih dahulu untuk mengakses fitur ini.</p>
        </div>
        <div className="modal-footer">
          <button className="btn" onClick={handleLogin}>
            Login
          </button>
          <button className="btn" onClick={handleModalClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
