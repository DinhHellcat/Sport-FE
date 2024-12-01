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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

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
      const tokens = await login({ email, password }); // Call login API
      console.log("Login Successful, Tokens:", tokens); // Debugging
      // Store tokens in localStorage
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("idToken", tokens.idToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      setMessage("Login successful. Redirecting...");
      setTimeout(() => {
        navigate("/user", { state: { tokens } }); // Pass tokens to User Page
      }, 2000);
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred during login. Please try again later.");
      // Optionally rethrow the error to handle it in a global error handler
      // throw error;
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
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default Login;
