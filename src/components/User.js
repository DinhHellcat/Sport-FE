// src/components/User.js
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getProdList } from "../services/apiService";

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tokens } = location.state || {}; // Tokens passed from Login
  const userEmail = tokens?.idToken ? JSON.parse(atob(tokens.idToken.split('.')[1])).email : "Unknown"; // Extract email from ID token
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProdList();
        setProducts(productList);  // Update the state with the product list
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  const handleLogout = () => {
    const confirmation = window.confirm("Are you sure you want to sign out?");
    if (confirmation) {
      console.log("Logging out...");
      localStorage.removeItem('authToken');
      navigate("/");
    }
  };

  const handleChangePassword = () => {
    navigate("/change-password");
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
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "1rem", width: "200px" }}>
            <img src={product.picture} alt={product.name} style={{ width: "100%" }} />
            <h3>{product.name}</h3>
            <button onClick={() => navigate(`/prod/${product.id}`)}>View Details</button>
          </div>
        ))}
      </main>
      {/* <div style={{ textAlign: "center", margin: "1rem" }}>
        <button>Add More</button>
      </div> */}
      {/* <footer style={{ textAlign: "center", padding: "1rem", background: "#f8f8f8" }}>
        <p>Footer</p>
      </footer> */}
    </div>
  );
};

export default User;
