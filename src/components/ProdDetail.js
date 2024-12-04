// src/components/ProdDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProdDetail } from "../services/apiService";

const ProdDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  //Product Detail Function
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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.picture} alt={product.name} style={{ width: "300px" }} />
      <p>{product.description}</p>
      <p>Quantity: {product.quantity}</p>
      <p>Price: {product.price}</p>
      <footer style={{ textAlign: "center", padding: "1rem", background: "#f8f8f8" }}>
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default ProdDetail;
