import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, checkAuth, storeUserData } from "../../utils/auth";
import "../css/Login.css";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      const { user } = await checkAuth();
      if (user) {
        navigate("/");
      }
    };
    loadUserData();
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Welcome Back</h1>
        <p>Please enter your credentials to login</p>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <button
        className="google-button"
        onClick={async () => {
          try {
            const { user } = await signInWithGoogle(navigate);
            if (user) {
              storeUserData(user);
              navigate("/");
            }
          } catch (error) {
            console.error("Gagal login dengan Google:", error);
          }
        }}
      >
        <i className="fab fa-google google-icon"></i>
        Continue with Google
      </button>
      <div className="additional-options">
        <button className="link-button">Forgot Password?</button>
        <br />
        <button className="link-button" onClick={() => navigate("/register")}>
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Login;
