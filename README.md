# 🛒 E-Commerce App

A full-stack e-commerce web application built with **React** on the frontend and **Express.js** on the backend, powered by a **MySQL** database.
### Home Page
<img width="955" height="437" alt="Screenshot 2026-04-17 225229" src="https://github.com/user-attachments/assets/8e6694b5-19d8-4d99-826f-e85ca3da5416" />


### Product View
<img width="955" height="436" alt="Screenshot 2026-04-17 225254" src="https://github.com/user-attachments/assets/98ffa330-96e3-42d5-8e8e-6587be3a836e" />

<img width="955" height="438" alt="Screenshot 2026-04-17 225322" src="https://github.com/user-attachments/assets/becc76fa-92de-4704-b911-f0accbedbfe2" />

### Cart Modal

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
