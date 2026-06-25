import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import "../App.css";

/**
 * ProductList Component
 * 
 * Hindi:
 * Yeh page database se saare products fetch karta hai, search filter lagata hai,
 * aur loading state dikhate hue responsive grid layout me products render karta hai.
 */
function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Failed to load products in ProductList:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter based on user's query input in the Navbar
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#f3f3f3", minHeight: "100vh", paddingBottom: "40px" }}>
      <Navbar
        search={search}
        setSearch={setSearch}
        products={products}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        {/* Banner Section */}
        <div style={{
          backgroundColor: "#EAEDED",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "24px",
          textAlign: "left",
          border: "1px solid #d5d9d9"
        }}>
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: "#0F1111" }}>
            Welcome to Amazon Clone Store
          </h2>
          <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#565959" }}>
            Find the best deals on top quality electronics, fashion, and accessories.
          </p>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px", flexDirection: "column" }}>
            {/* Spinning Loader */}
            <div style={{
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #febd69",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              animation: "spin 1s linear infinite"
            }} />
            <p style={{ marginTop: "16px", color: "#565959", fontSize: "14px" }}>Loading products...</p>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "40px",
            background: "#fff",
            borderRadius: "8px",
            border: "1px solid #ddd"
          }}>
            <h3 style={{ margin: 0, color: "#111" }}>No Products Found</h3>
            <p style={{ color: "#565959" }}>Try searching for a different item.</p>
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "14px", color: "#565959" }}>
                Showing 1-{filteredProducts.length} of {filteredProducts.length} results
              </span>
            </div>
            {/* Grid display layout */}
            <div className="products-container">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
