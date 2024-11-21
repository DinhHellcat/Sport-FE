// src/components/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
        <div>
          <h2>Logo</h2>
        </div>
        <div>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </header>
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

export default Home;
