// src/components/User.js
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tokens } = location.state || {}; // Tokens passed from Login
  const userEmail = tokens?.idToken ? JSON.parse(atob(tokens.idToken.split('.')[1])).email : "Unknown"; // Extract email from ID token

  const handleLogout = () => {
    const confirmation = window.confirm("Are you sure you want to sign out?");
    if (confirmation) {
      console.log("Logging out...");
      // Clear tokens (if stored in localStorage/sessionStorage)
      navigate("/");
    }
  };

  const handleChangePassword = () => {
    alert("Change Password - Coming Soon!");
  };

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
        <div>
          <h2>Logo</h2>
        </div>
        <div>
          <button onClick={handleChangePassword}>Change Password</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Logged in as: <strong>{userEmail}</strong>
      </p>
      <main style={{ display: "flex", justifyContent: "center", gap: "1rem", padding: "2rem" }}>
        <div>Product Card</div>
        <div>Product Card</div>
        <div>Product Card</div>
      </main>
      <div style={{ textAlign: "center", margin: "1rem" }}>
        <button>Add More</button>
      </div>
      <footer style={{ textAlign: "center", padding: "1rem", background: "#f8f8f8" }}>
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default User;
