import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import ProductCarousel from "../components/ProductCarousel";
import OfferBanner from "../components/OfferBanner";
import CategoryBar from "../components/CategoryBar";
import "../App.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ backgroundColor: "#f3f3f3", minHeight: "100vh", paddingBottom: "40px" }}>
      <Navbar
        search={search}
        setSearch={setSearch}
        products={products}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        {/* Auto-sliding Carousel */}
        <div style={{ marginTop: "16px" }}>
          <ProductCarousel products={products} />
        </div>

        {/* Category Filter Bar */}
        <CategoryBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Offer/Ad Banners */}
        <OfferBanner />

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px", flexDirection: "column" }}>
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
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔍</div>
            <h3 style={{ margin: "0 0 8px 0", color: "#111" }}>No Products Found</h3>
            <p style={{ color: "#565959" }}>Try a different search term or category.</p>
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontSize: "14px", color: "#565959" }}>
                Showing 1-{filteredProducts.length} of {filteredProducts.length} results
                {activeCategory !== "All" && <span> in <strong>{activeCategory}</strong></span>}
              </span>
            </div>
            <div className="products-container">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Mid-page Ad Banner */}
            <div style={{
              margin: "32px 0",
              background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
              borderRadius: "12px",
              padding: "24px 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px"
            }}>
              <div>
                <h3 style={{ margin: "0 0 4px 0", color: "#131921", fontSize: "20px" }}>
                  🔥 Deal of the Day
                </h3>
                <p style={{ margin: 0, color: "#565959", fontSize: "14px" }}>
                  Extra 10% OFF on all electronics. Use code <strong>DEAL10</strong> at checkout!
                </p>
              </div>
              <button
                onClick={() => setActiveCategory("Electronics")}
                style={{
                  background: "#131921",
                  color: "white",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "20px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                Shop Electronics
              </button>
            </div>

            {/* Bottom Ad Banner */}
            <div style={{
              background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
              borderRadius: "12px",
              padding: "20px 32px",
              textAlign: "center",
              marginTop: "16px"
            }}>
              <span style={{ fontSize: "14px", color: "#565959" }}>
                🚚 <strong>FREE Delivery</strong> on orders above ₹999 | 📦 <strong>Easy Returns</strong> within 7 days | 💳 <strong>Secure Payments</strong> with SSL encryption
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
