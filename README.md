# 🛒 E-Commerce App

> A full-stack e-commerce web application built with **React** on the frontend and **Express.js** on the backend, powered by a **MySQL** database.







***

## 📸 Screenshots

### Home Page
<img width="955" height="437" alt="Home Page" src="https://github.com/user-attachments/assets/8e6694b5-19d8-4d99-826f-e85ca3da5416" />

### Product View
<img width="955" height="436" alt="Product View" src="https://github.com/user-attachments/assets/98ffa330-96e3-42d5-8e8e-6587be3a836e" />

<img width="955" height="438" alt="Cart View" src="https://github.com/user-attachments/assets/becc76fa-92de-4704-b911-f0accbedbfe2" />

***

## 🚀 Features

- 📦 Browse products with category filtering
- 🔍 Real-time search with debounce
- 🔃 Sort products by price or relevance
- 🛒 Add to cart with quantity management
- 🪟 Cart modal with item overview
- ⚡ Fast API communication via Axios
- 🌐 Full-stack concurrent dev server

***

## 🧱 Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | React 18, React DOM         |
| Backend    | Node.js, Express.js         |
| Database   | MySQL (via mysql2)          |
| HTTP       | Axios                       |
| Dev Tools  | Concurrently, React Scripts |

***

## 📁 Project Structure

```
ecommerce-app/
├── backend/              # Express server & API routes
├── public/               # Static assets (index.html, icons)
├── src/
│   ├── components/       # Reusable React components (ProductCard, CartModal)
│   ├── services/         # Axios API service calls
│   └── App.js            # Main React app (state, filters, cart logic)
├── .gitignore            # Files ignored by Git
├── package.json          # Dependencies & scripts
├── package-lock.json     # Locked dependency versions
└── README.md             # Project documentation
```

***

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

4. **Run the app**
   ```bash
   npm run dev
   ```

***

## 🌐 Running Locally

| Service     | URL                                            |
|-------------|------------------------------------------------|
| Frontend    | [http://localhost:3000](http://localhost:3000) |
| Backend API | [http://localhost:5000](http://localhost:5000) |

> **Note:** The React app proxies API requests to `localhost:5000` automatically — no manual CORS config needed during development.

***

## 📜 Available Scripts

| Script              | Description                          |
|---------------------|--------------------------------------|
| `npm run dev`       | Run both frontend & backend together |
| `npm start`         | Start the Express backend only       |
| `npm run client`    | Start the React frontend only        |
| `npm run build`     | Build React app for production       |
| `npm test`          | Run React tests                      |

***

## 📡 API Endpoints

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| GET    | `/api/products`     | Fetch all products       |
| GET    | `/api/categories`   | Fetch product categories |

**Query params for `/api/products`:** `category`, `search`, `sort`

***

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

***

## 📄 License

This project is licensed under the [MIT License](LICENSE).

***

⭐ Found this useful? Give it a star!
