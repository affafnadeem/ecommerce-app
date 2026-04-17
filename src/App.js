import React, { useState, useEffect, useCallback } from "react";
import ProductCard from "./components/ProductCard";
import CartModal from "./components/CartModal";
import { getProducts, getCategories } from "./services/api";

// ─── Header ───────────────────────────────────────────────────────────────────
const Header = ({ cartCount, onCartOpen, search, onSearchChange }) => (
  <header
    style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "rgba(9, 9, 11, 0.8)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      padding: "0 24px",
    }}
  >
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            background: "linear-gradient(135deg, #FF007F 0%, #7C3AED 100%)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 15px rgba(255, 0, 127, 0.3)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <span style={{ fontSize: "22px", fontWeight: "900", color: "#fff", letterSpacing: "-1px" }}>
          SHOPR<span style={{ color: "#FF007F" }}>.</span>
        </span>
      </div>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: "520px", position: "relative" }}>
        <svg
          style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search the future…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px 12px 42px",
            border: "1.5px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            fontSize: "15px",
            color: "#fff",
            background: "rgba(255, 255, 255, 0.05)",
            outline: "none",
            boxSizing: "border-box",
            transition: "all 0.2s",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#FF007F";
            e.target.style.background = "rgba(255, 255, 255, 0.08)";
            e.target.style.boxShadow = "0 0 20px rgba(255, 0, 127, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
            e.target.style.background = "rgba(255, 255, 255, 0.05)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Cart button */}
      <button
        onClick={onCartOpen}
        style={{
          position: "relative",
          background: "#fff",
          border: "none",
          borderRadius: "12px",
          padding: "12px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#000",
          fontSize: "15px",
          fontWeight: "700",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 255, 255, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {cartCount > 0 && <span>({cartCount})</span>}
      </button>
    </div>
  </header>
);

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Load categories
  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch(() => {}); // fallback to default
  }, []);

  // Load products
  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError(null);
    getProducts({ category: activeCategory !== "All" ? activeCategory : undefined, search, sort })
      .then((res) => setProducts(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeCategory, search, sort]);

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 300); // debounce search
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  // Cart helpers
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#09090B", backgroundImage: "radial-gradient(circle at top, #18181B 0%, #09090B 100%)", color: "#fff", fontFamily: "'Outfit', 'Inter', system-ui, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&display=swap" rel="stylesheet" />
      
      <Header
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        search={search}
        onSearchChange={setSearch}
      />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
        {/* Hero Section */}
        <div style={{ marginBottom: "56px", textAlign: "center" }}>
          <h1 style={{ fontSize: "56px", fontWeight: "900", marginBottom: "16px", letterSpacing: "-2px" }}>
            Curated <span style={{ color: "#FF007F" }}>Innovation.</span>
          </h1>
          <p style={{ fontSize: "18px", color: "#9CA3AF", maxWidth: "600px", margin: "0 auto" }}>
            Discover the next generation of premium essentials. Hand-picked, high-performance, and designed for the modern lifestyle.
          </p>
        </div>

        {/* Filters Row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          {/* Category pills */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", background: "rgba(255,255,255,0.03)", padding: "6px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "12px",
                  border: "none",
                  background: activeCategory === cat ? "#FF007F" : "transparent",
                  color: activeCategory === cat ? "#fff" : "#9CA3AF",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: activeCategory === cat ? "0 4px 15px rgba(255, 0, 127, 0.4)" : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ height: "24px", width: "1px", background: "rgba(255,255,255,0.1)" }} />

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              padding: "10px 16px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              fontSize: "14px",
              color: "#fff",
              background: "rgba(255,255,255,0.05)",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="" style={{ background: "#09090B" }}>Trending</option>
            <option value="price-asc" style={{ background: "#09090B" }}>Price: Low to High</option>
            <option value="price-desc" style={{ background: "#09090B" }}>Price: High to Low</option>
            <option value="rating" style={{ background: "#09090B" }}>Top Rated</option>
          </select>
        </div>

        {/* Results count */}
        {!loading && !error && (
          <p style={{ textAlign: "center", marginBottom: "32px", fontSize: "14px", color: "#6B7280", letterSpacing: "1px", textTransform: "uppercase" }}>
            Showing <strong>{products.length}</strong> available items
          </p>
        )}

        {/* States */}
        {loading && (
          <div style={{ textAlign: "center", padding: "100px 0", color: "#9CA3AF" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "3px solid rgba(255,255,255,0.05)",
                borderTop: "3px solid #FF007F",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 16px",
                boxShadow: "0 0 20px rgba(255, 0, 127, 0.2)",
              }}
            />
            Neural networks loading…
          </div>
        )}

        {error && (
          <div
            style={{
              textAlign: "center",
              padding: "64px 32px",
              color: "#fff",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              borderRadius: "24px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
            <p style={{ fontWeight: "700", fontSize: "20px" }}>System Glitch Detected</p>
            <p style={{ fontSize: "15px", color: "#FCA5A5", marginTop: "4px" }}>{error}</p>
            <button onClick={fetchProducts} style={{ marginTop: "24px", padding: "12px 24px", borderRadius: "12px", border: "none", background: "#EF4444", color: "#fff", fontWeight: "700", cursor: "pointer", transition: "all 0.2s" }}>
              Reboot Connection
            </button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div style={{ textAlign: "center", padding: "100px 0", color: "#9CA3AF" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
            <p style={{ fontSize: "20px", fontWeight: "700", color: "#fff" }}>Void Found</p>
            <p style={{ fontSize: "16px", marginTop: "8px" }}>Try recalibrating your search parameters.</p>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && products.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "32px",
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      {cartOpen && (
        <CartModal
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateCart={setCart}
        />
      )}

      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background-color: #09090B; }
        @keyframes spin { to { transform: rotate(360deg) } }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #09090B; }
        ::-webkit-scrollbar-thumb { background: #27272A; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: #3F3F46; }
      `}</style>
    </div>
  );
}
