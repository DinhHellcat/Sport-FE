// src/components/User.js
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getProdList } from "../../services/apiService";

const User = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { tokens } = state || {}; // Directly extract tokens from location state
  const userEmail = tokens?.idToken 
    ? JSON.parse(atob(tokens.idToken.split('.')[1])).email 
    : "Unknown";
  
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  // Fetch Product List
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProdList();
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
      }
    };

    fetchProducts();
  }, [tokens]); // Re-fetch products when tokens change

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
    <div className="user-container">
      <header className="user-header">
        <h1 className="logo">Logo</h1>
        <div>
          <button onClick={handleChangePassword}>Change Password</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      
      <p className="user-email">Logged in as: <strong>{userEmail}</strong></p>

      {error && <div className="error-message">{error}</div>} {/* Display error message if there's one */}
      
      <main className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.picture} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-category">{product.category}</p>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
            <p className="product-quantity">In Stock: {product.quantity}</p>
            <button onClick={() => navigate(`/prod/${product.id}`)}>View Details</button>
          </div>
        ))}
      </main>
    </div>
  );
};

export default User;
