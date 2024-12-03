// src/components/Auth/AdminLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/apiService";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateUsername = (username) => {
    return username.trim().length > 0; // Basic validation, can be enhanced
  };

  const validatePassword = (password) => {
    return password.trim().length >= 6; // Ensure password is at least 6 characters
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    if (!validateUsername(username)) {
      setMessage("Username cannot be empty.");
      return;
    }

    if (!validatePassword(password)) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await loginAdmin({ username, password });
      const { accessToken } = response; // Get the access token
      // Save token to localStorage
      localStorage.setItem("adminAccessToken", accessToken);
      setMessage("Login successful. Redirecting...");

      // Redirect to AdminDashboard after successful login
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error during admin login:", error);
      setMessage("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        Not an admin?{" "}
        <button onClick={() => navigate("/login")}>Login as User</button>
      </p>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default AdminLogin;
