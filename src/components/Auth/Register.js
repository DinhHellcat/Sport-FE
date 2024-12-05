// src/components/Auth/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/apiService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,}$/;
    return passwordRegex.test(password);
  };

  // Register Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateEmail(email)) {
      setMessage("Invalid email format. Please provide a valid email.");
      return;
    }

    if (!validatePassword(password)) {
      setMessage(
        "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character."
      );
      return;
    }

    if (password !== reenteredPassword) {
      setMessage("Passwords do not match. Please re-enter your password.");
      return;
    }

    try {
      const response = await register({ email, password });
      console.log("Registration successful:", response);
      setMessage("Registration successful. Redirecting to login...");
      setTimeout(() => {
        navigate("/confirm", { state: { email } });
      }, 2000);
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage(error.message);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-input"
            type="password"
            placeholder="Re-enter Password"
            value={reenteredPassword}
            onChange={(e) => setReenteredPassword(e.target.value)}
            required
          />
        </div>
        <button className="submit-button" type="submit">Register</button>
      </form>
      <p className="message">{message}</p>
      <p className="login-link">
        Already have an account?{" "}
        <button className="login-button" onClick={() => navigate("/login")}>Login</button>
      </p>
      <button className="back-home-button" onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default Register;
