import React from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { checkAuth } from "../utils/auth";
import "../components/css/Navbar.css";

const Navbar = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">MentaEase</div>
        <div className="hamburger-menu" onClick={toggleMobileMenu}>
          <div
            className={`hamburger-line ${isMobileMenuOpen ? "active" : ""}`}
          ></div>
          <div
            className={`hamburger-line ${isMobileMenuOpen ? "active" : ""}`}
          ></div>
          <div
            className={`hamburger-line ${isMobileMenuOpen ? "active" : ""}`}
          ></div>
        </div>

        <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link
            to="/chat"
            onClick={(e) => {
              handleAIThorClick(e);
              setIsMobileMenuOpen(false);
            }}
          >
            AIThor
          </Link>
          <Link to="/policy" onClick={() => setIsMobileMenuOpen(false)}>
            Policy
          </Link>
          <Link
            to="/account"
            onClick={() => {
              handleAccountClick();
              setIsMobileMenuOpen(false);
            }}
          >
            {user ? user.email : "Account"}
          </Link>
        </div>
      </div>

      {showModal && <Modal show={showModal} onClose={handleCloseModal} />}
    </nav>
  );
};

export default Navbar;
