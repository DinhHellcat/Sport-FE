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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages

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
      console.log("Registration successful:", response); // Debugging
      setMessage("Registration successful. Redirecting to login...");
      setTimeout(() => {
        navigate("/confirm", { state: { email } });
      }, 2000);
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred during registration. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Register</h1>
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
        <input
          type="password"
          placeholder="Re-enter Password"
          value={reenteredPassword}
          onChange={(e) => setReenteredPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/login")}>Login</button>
      </p>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default Register;
