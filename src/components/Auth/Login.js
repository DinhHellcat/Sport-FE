// src/components/Auth/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  //Login Function
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

    try {
      const tokens = await login({ email, password }); 
      console.log("Login Successful, Tokens:", tokens); //token
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("idToken", tokens.idToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      setMessage("Login successful. Redirecting...");
      setTimeout(() => {
        navigate("/user", { state: { tokens } });
      }, 2000);
    } catch (error) {
      console.error("Error during login:", error);
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      <p>
        New to our website?{" "}
        <button onClick={() => navigate("/register")}>Register</button>
      </p>
      <p>
        Admin Login?{" "}
        <button onClick={() => navigate("/admin-login")}>Login as Admin</button>
      </p>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default Login;
