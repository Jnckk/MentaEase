import React from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { checkAuth } from "../utils/auth";
import "../components/css/Navbar.css";

const Navbar = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const loadUser = async () => {
      const auth = await checkAuth();
      setUser(auth.user);
    };
    loadUser();
  }, []);

  const handleAIThorClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowModal(true);
    }
  };

const handleAccountClick = () => {
  window.location.href = "/account";
};


  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">MentaEase</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/chat" onClick={handleAIThorClick}>
            AIThor
          </Link>
          <Link to="/policy">Policy</Link>
          <Link to="/account" onClick={handleAccountClick}>
            {user ? user.email : "Account"}
          </Link>
        </div>
      </div>
      {showModal && <Modal show={showModal} onClose={handleCloseModal} />}
    </nav>
  );
};

export default Navbar;
