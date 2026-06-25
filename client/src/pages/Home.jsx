/**
 * @file Home.jsx
 * @description AmazonLite Storefront Home Page.
 * Is page par saare products database se fetch hote hain aur hum criteria basis par unhe search/filter kar sakte hain.
 * 
 * Hinglish Guide:
 * Yeh hamara main landing storefront page hai.
 * Yahan standard product listing grid display kiya gaya hai.
 * Navbar ko custom state functions pass kiye gaye hain taaki live filter functionality handle ho sake.
 */

import { useEffect, useState } from "react";
import api from "../api";
import "../App.css";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function Home() {
  // Product load storage state
  const [products, setProducts] = useState([]);

  // Live filter query stream text tracker
  const [search, setSearch] = useState("");

  // Server database se products call pull fetch logic
  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => {
        console.log("Products loaded in Home.jsx:", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Home.jsx API fetch error:", err);
      });
  }, []);

  // User input matches list structure
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar
        search={search}
        setSearch={setSearch}
        products={products}
      />
      
      {/* Root Layout Header */}
      <h1>Amazon Clone</h1>

      {/* Product count indicator display banner */}
      <p>Total Products: {filteredProducts.length}</p>

      {/* Grid wrapper for styling layout cards items list */}
      <div className="products-container">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;