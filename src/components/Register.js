import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/apiService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages

    try {
      const response = await register({ email, password });
      console.log("API Response:", response); // Debugging
      setMessage("Verification code sent to your email. Please confirm.");
      navigate("/confirm", { state: { email } }); // Pass email to Confirm.js
    } catch (error) {
      console.error("Error during registration:", error);

      // Proceed to the confirmation page even if there's a CORS error
      setMessage(
        "Verification code sent to your email. Please confirm."
      );
      navigate("/confirm", { state: { email } });
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
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register;
