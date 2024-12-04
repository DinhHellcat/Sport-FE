// src/components/Home.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProdList } from "../services/apiService";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  //Product List Function
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

export default Home;
