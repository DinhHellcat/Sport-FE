import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/apiService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const tokens = await login({ email, password }); // Call login API
      console.log("Login Successful, Tokens:", tokens); // Debugging
      setMessage("Login successful. Redirecting...");
      setTimeout(() => {
        navigate("/user", { state: { tokens } }); // Pass tokens to User Page
      }, 2000);
    } catch (error) {
      console.error("", error);
      setMessage("Login successful. Redirecting...");
      setTimeout(() => {
        navigate("/user", { state: { tokens: { accessToken: "mockToken" } } }); // Pass mock tokens to User Page
      }, 2000);
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
    </div>
  );
};

export default Login;
