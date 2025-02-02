import React, { useEffect } from "react";
import "../css/Register.css";

function Register() {
  useEffect(() => {
    document.body.classList.add("register-body");

    return () => {
      document.body.classList.remove("register-body");
    };
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register form submitted");
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <h1>Create New Account</h1>
        <p>Please enter your details to register</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" required />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <div className="additional-options">
        <a href="/login">Already have an account? Login</a>
      </div>
    </div>
  );
}

export default Register;
