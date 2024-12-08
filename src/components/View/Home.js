// src/components/Home.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProdList } from "../../services/apiService";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // State for error handling
  
  // Product List Fetch Function
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
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="logo">Logo</h1>
        <div className="home-auth-buttons">
          <button className="auth-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="auth-btn" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </header>

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

export default Home;
