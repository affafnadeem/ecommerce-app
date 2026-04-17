const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ─── Mock Product Data ────────────────────────────────────────────────────────
const products = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    category: "Electronics",
    rating: 4.8,
    reviews: 2341,
    stock: 15,
    description:
      "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and studio-quality sound.",
  },
  {
    id: 2,
    name: "Minimalist Leather Watch",
    price: 189.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    category: "Accessories",
    rating: 4.6,
    reviews: 987,
    stock: 8,
    description:
      "Handcrafted genuine leather strap with sapphire crystal glass and Swiss quartz movement.",
  },
  {
    id: 3,
    name: "Ergonomic Mechanical Keyboard",
    price: 149.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80",
    category: "Electronics",
    rating: 4.7,
    reviews: 1562,
    stock: 22,
    description:
      "Tactile brown switches, per-key RGB lighting, and aluminium frame for the ultimate typing experience.",
  },
  {
    id: 4,
    name: "Scented Soy Candle Set",
    price: 49.99,
    originalPrice: 64.99,
    image: "https://images.unsplash.com/photo-1602928298849-ecca522bdc0d?w=400&q=80",
    category: "Home",
    rating: 4.9,
    reviews: 3210,
    stock: 50,
    description:
      "Set of 3 hand-poured soy candles in cedarwood, lavender, and vanilla scents. 40-hour burn time each.",
  },
  {
    id: 5,
    name: "Portable Espresso Maker",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
    category: "Kitchen",
    rating: 4.5,
    reviews: 728,
    stock: 30,
    description:
      "Brew café-quality espresso anywhere. Compatible with Nespresso pods and ground coffee. No electricity needed.",
  },
  {
    id: 6,
    name: "Merino Wool Tote Bag",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80",
    category: "Accessories",
    rating: 4.4,
    reviews: 445,
    stock: 12,
    description:
      "Sustainably sourced merino wool tote with leather handles. Fits 15-inch laptops. Water-resistant lining.",
  },
];

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET all products
app.get("/api/products", (req, res) => {
  const { category, search, sort } = req.query;
  let result = [...products];

  if (category && category !== "All") {
    result = result.filter((p) => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
  else if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

  res.json({ success: true, data: result, total: result.length });
});

// GET single product
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }
  res.json({ success: true, data: product });
});

// GET categories
app.get("/api/categories", (req, res) => {
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  res.json({ success: true, data: categories });
});

// POST create order
app.post("/api/orders", (req, res) => {
  const { items, customer } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = {
    id: `ORD-${Date.now()}`,
    items,
    customer,
    total: total.toFixed(2),
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  res.status(201).json({
    success: true,
    message: "Order placed successfully!",
    data: order,
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running", timestamp: new Date() });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  console.log(`🌐 Accessible at http://10.44.245.150:${PORT}`);
});

module.exports = app;
