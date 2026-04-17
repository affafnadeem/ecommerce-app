import React, { useState } from "react";

// ─── Star Rating ──────────────────────────────────────────────────────────────
const StarRating = ({ rating }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? "#FFD700" : "none"}
          stroke={star <= Math.round(rating) ? "#FFD700" : "rgba(255,255,255,0.2)"}
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginLeft: "6px" }}>
        {rating}
      </span>
    </div>
  );
};

// ─── ProductCard Component ────────────────────────────────────────────────────
const ProductCard = ({ product, onAddToCart }) => {
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      style={{
        background: "rgba(24, 24, 27, 0.4)",
        backdropFilter: "blur(12px)",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
        e.currentTarget.style.borderColor = "rgba(255, 0, 127, 0.4)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 0, 127, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image Container */}
      <div style={{ position: "relative", overflow: "hidden", height: "240px", background: "rgba(255,255,255,0.02)" }}>
        <img
          src={imgError ? "https://via.placeholder.com/400x240?text=System+Sync" : product.image}
          alt={product.name}
          onError={() => setImgError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        />

        {/* Gloss overlay */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, transparent 0%, rgba(9,9,11,0.4) 100%)", pointerEvents: "none" }} />

        {/* Discount badge */}
        {discount && (
          <span
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              background: "#FF007F",
              color: "#fff",
              fontSize: "12px",
              fontWeight: "900",
              padding: "4px 10px",
              borderRadius: "8px",
              letterSpacing: "0.5px",
              boxShadow: "0 0 15px rgba(255, 0, 127, 0.4)",
            }}
          >
            -{discount}%
          </span>
        )}

        {/* Stock warning */}
        {product.stock <= 10 && (
          <span
            style={{
              position: "absolute",
              bottom: "16px",
              right: "16px",
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(4px)",
              color: "#10B981",
              fontSize: "11px",
              fontWeight: "700",
              padding: "4px 10px",
              borderRadius: "8px",
              border: "1px solid rgba(16, 185, 129, 0.3)",
            }}
          >
            LIMITED: {product.stock}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Category */}
        <span
          style={{
            fontSize: "10px",
            fontWeight: "800",
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "#FF007F",
          }}
        >
          {product.category}
        </span>

        {/* Name */}
        <h3
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: "700",
            color: "#fff",
            lineHeight: "1.3",
            letterSpacing: "-0.5px",
          }}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#9CA3AF",
            lineHeight: "1.6",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </p>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <StarRating rating={product.rating} />
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontWeight: "600" }}>
            {product.reviews?.toLocaleString()} XP
          </span>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "12px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div>
            <span
              style={{ fontSize: "22px", fontWeight: "900", color: "#fff", letterSpacing: "-1px" }}
            >
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              background: added ? "#10B981" : "rgba(255,255,255,0.05)",
              color: "#fff",
              border: added ? "none" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "10px 18px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: added ? "0 0 20px rgba(16, 185, 129, 0.4)" : "none",
            }}
            onMouseEnter={(e) => {
              if (!added) {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#000";
              }
            }}
            onMouseLeave={(e) => {
              if (!added) {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = "#fff";
              }
            }}
          >
            {added ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                SECURED
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                ACQUIRE
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
