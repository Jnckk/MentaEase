import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { signOut, checkAuth } from "../../utils/auth";
import "../css/Account.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Account = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const loadUser = async () => {
      const auth = await checkAuth();
      setUser(auth.user);
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="account-container">
      <Navbar />
      <div className="account-content-container">
        <div className="account-header">
          <FontAwesomeIcon icon={faUserCircle} className="icon" />
          <h1>Account Information</h1>
        </div>
        <div className="account-content">
          {user ? (
            <div className="account-info-container">
              <div className="account-info">
                <span className="account-info-label">Name</span>
                <span className="account-info-value">{user.name || "-"}</span>
              </div>
              <div className="account-info">
                <span className="account-info-label">Email</span>
                <span className="account-info-value">{user.email}</span>
              </div>
              <button onClick={handleLogout} className="logout-button">
                <FontAwesomeIcon icon={faSignOut} className="logout-icon" />
                Logout
              </button>
            </div>
          ) : (
            <div className="login-prompt-container">
              <div className="separator"></div>
              <div className="login-prompt">
                <p className="prompt-message">
                  Silakan masuk untuk melihat informasi akun Anda
                </p>
                <button
                  className="login-button"
                  onClick={() => (window.location.href = "/login")}
                >
                  Masuk
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default Account;
