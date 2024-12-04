// src/components/CreateProd.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProd } from "../services/apiService"; // Import the createProd function

const CreateProd = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    images: [], // Array to store multiple image URLs
  });
  const navigate = useNavigate(); // Hook for navigation

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };

  // Handle images input (multiple image URLs)
  const handleImagesChange = (e) => {
    const { value } = e.target;
    setProductDetails({
      ...productDetails,
      images: value.split(",").map((url) => url.trim()), // Split input string by comma and trim each URL
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProd(productDetails); // Call API to create the product
      navigate("/admin-dashboard"); // Navigate back to admin dashboard after success
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div>
      <h1>Create New Product</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productDetails.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={productDetails.category}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={productDetails.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productDetails.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={productDetails.quantity}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="images"
          placeholder="Image URLs (comma separated)"
          value={productDetails.images.join(", ")} // Join array into a string for display
          onChange={handleImagesChange}
          required
        />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProd;
