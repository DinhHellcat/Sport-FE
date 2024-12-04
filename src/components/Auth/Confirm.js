// src/components/Auth/Confirm.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmEmail } from "../../services/apiService";

const Confirm = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  // Email Confirm Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await confirmEmail({ email, code });
      console.log("API Response:", response); 
      setMessage("Email confirmed successfully. Redirecting to Home...");
      setTimeout(() => {
        navigate("/"); 
      }, 2000); 
    } catch (error) {
      console.error("Error during email confirmation:", error);
      setMessage("An error occurred during email confirmation. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Confirm Email</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Confirm</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Confirm;
