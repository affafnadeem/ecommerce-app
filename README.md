# 🛒 E-Commerce App

A full-stack e-commerce web application built with **React** on the frontend and **Express.js** on the backend, powered by a **MySQL** database.

---

## 🚀 Features

- 📦 Browse products with category filtering
- 🔍 Real-time search with debounce
- 🔃 Sort products by price or relevance
- 🛒 Add to cart with quantity management
- 🪟 Cart modal with item overview
- ⚡ Fast API communication via Axios
- 🌐 Full-stack concurrent dev server

---

## 🧱 Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | React 18, React DOM         |
| Backend    | Node.js, Express.js         |
| Database   | MySQL (via mysql2)          |
| HTTP       | Axios                       |
| Dev Tools  | Concurrently, React Scripts |

---

## 📁 Project Structure
ecommerce-app/
├── backend/
│ └── server.js # Express server entry point
├── src/
│ ├── components/
│ │ ├── ProductCard.js # Product display card
│ │ └── CartModal.js # Shopping cart modal
│ ├── services/
│ │ └── api.js # Axios API service calls
│ └── App.js # Main React app component
├── package.json
└── README.md


---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v16+)
- MySQL database running locally

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ecommerce-app.git
   cd ecommerce-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the database**
   - Create a MySQL database
   - Update your database credentials in `backend/server.js`

4. **Run the app (frontend + backend together)**
   ```bash
   npm run dev
   ```

   This runs the Express server on `http://localhost:5000` and the React app on `http://localhost:3000` concurrently.

---

## 📜 Available Scripts

| Script        | Description                            |
|---------------|----------------------------------------|
| `npm start`   | Start the Express backend only         |
| `npm run client` | Start the React frontend only       |
| `npm run dev` | Run both frontend & backend together   |
| `npm run build` | Build React app for production       |
| `npm test`    | Run React tests                        |

---

## 🌐 API Endpoints

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| GET    | `/api/products`     | Fetch all products       |
| GET    | `/api/categories`   | Fetch product categories |

Query params for `/api/products`: `category`, `search`, `sort`

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)
