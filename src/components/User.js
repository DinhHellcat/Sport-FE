// src/components/User.js
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getProdList } from "../services/apiService";

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tokens } = location.state || {}; 
  const userEmail = tokens?.idToken ? JSON.parse(atob(tokens.idToken.split('.')[1])).email : "Unknown";
  const [products, setProducts] = useState([]);

  // Fetch Product List
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProdList();
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Sign Out Function
  const handleLogout = () => {
    const confirmation = window.confirm("Are you sure you want to sign out?");
    if (confirmation) {
      console.log("Logging out...");
      localStorage.removeItem('accessToken');
      localStorage.removeItem('idToken');
      localStorage.removeItem('refreshToken');
      navigate("/");
    }
  };

  // Change Password Navigation
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
            <p>{product.category}</p>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>In Stock: {product.quantity}</p>
            <button onClick={() => navigate(`/prod/${product.id}`)}>View Details</button>
          </div>
        ))}
      </main>
    </div>
  );
};

export default User;
