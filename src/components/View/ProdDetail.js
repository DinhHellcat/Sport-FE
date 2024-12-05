// src/components/ProdDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProdDetail } from "../../services/apiService";

const ProdDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  // Product Detail Fetch Function
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productDetail = await getProdDetail(id);
        setProduct(productDetail);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetail();
  }, [id]);

  // If the product is still loading, show a loading message
  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="product-detail-container">
      <h1 className="product-title">{product.name}</h1>
      <img
        src={product.picture}
        alt={product.name}
        className="product-image"
      />
      <p className="product-description">{product.description}</p>
      <p className="product-quantity">Quantity: {product.quantity}</p>
      <p className="product-price">Price: ${product.price}</p>

      <footer className="product-footer">
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default ProdDetail;
