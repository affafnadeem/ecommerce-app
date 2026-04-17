import React, { useState } from "react";
import { placeOrder } from "../services/api";

// ─── CartItem Row ─────────────────────────────────────────────────────────────
const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "20px 0",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    }}
  >
    <img
      src={item.image}
      alt={item.name}
      style={{
        width: "80px",
        height: "80px",
        objectFit: "cover",
        borderRadius: "12px",
        flexShrink: 0,
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
      }}
    />

    <div style={{ flex: 1, minWidth: 0 }}>
      <p
        style={{
          margin: "0 0 4px",
          fontSize: "15px",
          fontWeight: "700",
          color: "#fff",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {item.name}
      </p>
      <p style={{ margin: 0, fontSize: "14px", color: "rgba(255, 255, 255, 0.5)", fontWeight: "600" }}>
        ${item.price.toFixed(2)}
      </p>
    </div>

    {/* Quantity controls */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "10px",
        padding: "4px",
        border: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <button
        onClick={() => onDecrease(item.id)}
        style={qtyBtnStyle}
        aria-label="Decrease quantity"
      >
        –
      </button>
      <span style={{ fontSize: "15px", fontWeight: "800", minWidth: "24px", textAlign: "center", color: "#fff" }}>
        {item.quantity}
      </span>
      <button
        onClick={() => onIncrease(item.id)}
        style={qtyBtnStyle}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>

    {/* Line total */}
    <span style={{ fontSize: "15px", fontWeight: "800", color: "#FF007F", minWidth: "70px", textAlign: "right" }}>
      ${(item.price * item.quantity).toFixed(2)}
    </span>

    {/* Remove */}
    <button
      onClick={() => onRemove(item.id)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "rgba(255, 255, 255, 0.2)",
        padding: "6px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.2)")}
      aria-label="Remove item"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M19 6L5 6M10 11V17M14 11V17M10 6V4C10 3.44772 10.4477 3 11 3H13C13.5523 3 14 3.44772 14 4V6M17 6L17 19C17 19.5523 16.5523 20 16 20H8C7.44772 20 7 19.5523 7 19L7 6" />
      </svg>
    </button>
  </div>
);

const qtyBtnStyle = {
  background: "rgba(255, 255, 255, 0.05)",
  border: "none",
  borderRadius: "6px",
  width: "30px",
  height: "30px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "800",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s",
};

// ─── CartModal Component ──────────────────────────────────────────────────────
const CartModal = ({ cart, onClose, onUpdateCart }) => {
  const [orderStatus, setOrderStatus] = useState(null); // null | "loading" | "success" | "error"
  const [orderId, setOrderId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleIncrease = (id) => {
    onUpdateCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    onUpdateCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (id) => {
    onUpdateCart(cart.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    setOrderStatus("loading");
    setErrorMsg("");
    try {
      const res = await placeOrder({
        items: cart.map(({ id, name, price, quantity }) => ({
          id, name, price, quantity,
        })),
        customer: { name: "Cyber User", email: "guest@neo.city" },
      });
      setOrderId(res.data.id);
      setOrderStatus("success");
      onUpdateCart([]);
    } catch (err) {
      setErrorMsg(err.message || "Failed to sync order with the grid.");
      setOrderStatus("error");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          zIndex: 999,
          backdropFilter: "blur(12px)",
          animation: "fadeIn 0.3s ease",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "min(520px, 100vw)",
          height: "100vh",
          background: "rgba(9, 9, 11, 0.98)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-10px 0 40px rgba(0,0,0,0.8)",
          animation: "slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.05)",
          fontFamily: "'Outfit', sans-serif",
          color: "#fff",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "32px 32px 24px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ color: "#FF007F" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "900", letterSpacing: "-1px" }}>
              CARGO<span style={{ color: "rgba(255,255,255,0.3)" }}>/</span>{itemCount}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "none",
              borderRadius: "12px",
              width: "40px",
              height: "40px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#FF007F")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 32px" }}>
          {orderStatus === "success" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                gap: "24px",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  background: "rgba(16, 185, 129, 0.1)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid rgba(16, 185, 129, 0.4)",
                  boxShadow: "0 0 30px rgba(16, 185, 129, 0.2)",
                }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "28px", fontWeight: "900", letterSpacing: "-1px" }}>
                  TRANSACTION SECURED
                </h3>
                <p style={{ margin: "12px 0 0", color: "#9CA3AF", fontSize: "16px", lineHeight: "1.6" }}>
                  Order <strong>{orderId}</strong> has been confirmed on the blockchain.
                </p>
              </div>
              <button onClick={onClose} style={primaryBtnStyle}>
                RETURN TO GRID
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                textAlign: "center",
                gap: "16px",
                color: "#6B7280",
              }}
            >
              <div style={{ opacity: 0.1 }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <p style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#fff" }}>
                Cargo Bay Empty
              </p>
              <p style={{ margin: 0, fontSize: "15px" }}>
                Browse the collection to add items.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && orderStatus !== "success" && (
          <div style={{ padding: "32px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
            {/* Summary */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <span style={{ fontSize: "15px", color: "#9CA3AF", fontWeight: "600" }}>SUBTOTAL</span>
              <span style={{ fontSize: "15px", color: "#fff", fontWeight: "800" }}>${total.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "32px",
              }}
            >
              <span style={{ fontSize: "18px", fontWeight: "900", letterSpacing: "-0.5px" }}>TOTAL DUE</span>
              <span style={{ fontSize: "28px", fontWeight: "900", color: "#fff", letterSpacing: "-1px" }}>
                ${total.toFixed(2)}
              </span>
            </div>

            {orderStatus === "error" && (
              <p style={{ color: "#EF4444", fontSize: "14px", marginBottom: "16px", textAlign: "center", fontWeight: "600" }}>
                ⚠️ {errorMsg}
              </p>
            )}

            <button
              onClick={handleCheckout}
              disabled={orderStatus === "loading"}
              style={{ 
                ...primaryBtnStyle, 
                width: "100%", 
                background: "#FF007F",
                boxShadow: "0 0 25px rgba(255, 0, 127, 0.4)",
                opacity: orderStatus === "loading" ? 0.7 : 1 
              }}
            >
              {orderStatus === "loading" ? "SYNCHRONIZING..." : "INITIATE CHECKOUT"}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideIn { from { transform: translateX(100%) } to { transform: translateX(0) } }
      `}</style>
    </>
  );
};

const primaryBtnStyle = {
  background: "#fff",
  color: "#000",
  border: "none",
  borderRadius: "14px",
  padding: "16px 32px",
  fontSize: "16px",
  fontWeight: "900",
  cursor: "pointer",
  textAlign: "center",
  letterSpacing: "1px",
  transition: "all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1)",
  textTransform: "uppercase",
};

export default CartModal;
