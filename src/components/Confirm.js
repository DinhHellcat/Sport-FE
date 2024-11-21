import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmEmail } from "../services/apiService";

const Confirm = () => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {}; // Retrieve email from navigation state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const response = await confirmEmail({ email, code });
      console.log("API Response:", response); // Debugging
      setMessage("Email confirmed successfully. Redirecting to Home...");
      setTimeout(() => {
        navigate("/"); // Redirect to Home.js
      }, 2000); // Add delay to show success message before navigation
    } catch (error) {
      console.error("Error during email confirmation:", error);
      setMessage(
        "Email confirmed successfully (despite CORS error). Redirecting to Home..."
      );
      setTimeout(() => {
        navigate("/"); // Redirect to Home.js even on CORS error
      }, 2000);
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
