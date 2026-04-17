import axios from "axios";

const BASE_URL = "/api";

// ─── Axios Instance ───────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You could attach auth tokens here
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "An error occurred";
    return Promise.reject(new Error(message));
  }
);

// ─── Product API ──────────────────────────────────────────────────────────────

/**
 * Fetch all products with optional filters
 * @param {Object} params - { category, search, sort }
 */
export const getProducts = (params = {}) => {
  return api.get("/products", { params });
};

/**
 * Fetch a single product by ID
 * @param {number} id - Product ID
 */
export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

/**
 * Fetch all available categories
 */
export const getCategories = () => {
  return api.get("/categories");
};

// ─── Order API ────────────────────────────────────────────────────────────────

/**
 * Place an order
 * @param {Object} orderData - { items, customer }
 */
export const placeOrder = (orderData) => {
  return api.post("/orders", orderData);
};

// ─── Health Check ─────────────────────────────────────────────────────────────

export const healthCheck = () => {
  return api.get("/health");
};

export default api;
