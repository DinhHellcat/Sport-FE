// src/components/Auth/ChangePassword.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate hook from React Router
import { changePassword } from "../../services/apiService";

const ChangePassword = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!validatePassword(newPassword)) {
      setErrorMessage("Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      await changePassword(oldPassword, newPassword);
      setSuccessMessage("Password changed successfully!");
      navigate("/user"); // Redirect to /user route
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="change-password-container">
      <h2 className="change-password-title">Change Password</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form className="change-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button className="submit-button" type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
