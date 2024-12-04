// src/components/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { getProdList } from "../services/apiService";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

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

  // Handle Create Product button click
  const handleCreateProduct = () => {
    navigate("/create-prod"); // Navigate to CreateProd page
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleCreateProduct}
      >
        Create
      </button>

      <table style={{ width: "100%", marginTop: "2rem", border: "1px solid #ccc" }}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => alert(`View details of ${product.name}`)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
