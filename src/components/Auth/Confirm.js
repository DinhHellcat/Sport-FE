// src/components/Auth/Confirm.js
import React, { useState } from "react";
import { confirmEmail } from "../../services/apiService";
import { useLocation, useNavigate } from "react-router-dom";

const Confirm = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

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
      setMessage(error.message);    
    }
  };

  return (
    <div className="confirm-container">
      <h1 className="confirm-title">Confirm Email</h1>
      <form onSubmit={handleSubmit} className="confirm-form">
        <input
          className="form-input"
          type="text"
          placeholder="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button className="submit-button" type="submit">Confirm</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Confirm;
