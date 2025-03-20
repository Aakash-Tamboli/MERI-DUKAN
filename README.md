# MERI-DUKAN ![MERI-DUKAN](https://img.shields.io/badge/E--Commerce-Online-blue.svg)

## 🚀 Introduction

MERI-DUKAN is a full-stack e-commerce application built for learning purposes. It includes a **React** frontend powered by **Vite** and a **Node.js** backend using **Express** and **MongoDB**. The app supports user authentication, product management, payments with **Stripe**, and more.

## [Live Demo](https://meri-dukan.onrender.com)

## .env boilerplate code for future developement if I do

```env
   MONGO_URI=
   PORT=5000
   UPSTASH_REDIS_URL=
   ACCESS_TOKEN_SECRET=
   REFRESH_TOKEN_SECRET=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   STRIPE_SECRET_KEY=
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
```

## 📂 Project Structure

```
Generic-E-Commerce/
├── client-app/        # Frontend (React + Vite)
├── design/            # Backend Design, it gives idea How backed works
├── server-app/        # Backend (Node.js + Express + MongoDB)
└── README.md          # Documentation
```

## 🛠️ Tech Stack

### Frontend (Client-App) - [React](https://reactjs.org/)

| Package               | Description                     |
| --------------------- | ------------------------------- |
| `vite`                | Development server & build tool |
| `react` & `react-dom` | Core UI library                 |
| `react-router-dom`    | Client-side routing             |
| `zustand`             | State management                |
| `axios`               | API requests                    |
| `framer-motion`       | Animations                      |
| `recharts`            | Data visualization              |
| `react-hot-toast`     | Notifications                   |
| `lucide-react`        | Icons                           |
| `react-confetti`      | Celebration effects             |
| `@stripe/stripe-js`   | Payment handling                |

### Backend (Server-App) - [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)

| Package         | Description            |
| --------------- | ---------------------- |
| `express`       | Web framework          |
| `mongoose`      | MongoDB ODM            |
| `jsonwebtoken`  | JWT authentication     |
| `bcryptjs`      | Password hashing       |
| `cloudinary`    | Image uploads          |
| `cookie-parser` | Handling cookies       |
| `dotenv`        | Environment variables  |
| `ioredis`       | Caching with Redis     |
| `stripe`        | Payment integration    |
| `nodemon` (dev) | Auto-restarting server |

## 🚀 Setup Instructions

### Clone Repository

```sh
git clone https://github.com/your-username/Generic-E-Commerce.git
cd Generic-E-Commerce
```

### 🌐 Backend Setup

1. Navigate to the server directory:
   ```sh
   cd server-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   MONGO_URI=
   PORT=5000
   UPSTASH_REDIS_URL=
   ACCESS_TOKEN_SECRET=
   REFRESH_TOKEN_SECRET=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   STRIPE_SECRET_KEY=
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
  ```
4. Run the server:
   ```sh
   npm run dev
   ```

### 🎨 Frontend Setup

1. Navigate to the client directory:
   ```sh
   cd client-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm run dev
   ```

## 🎯 Features

✅ User Authentication (JWT)  
✅ Product Management  
✅ Secure Payments with Stripe  
✅ Image Uploads with Cloudinary  
✅ State Management with Zustand  
✅ Animations with Framer Motion  
✅ Responsive UI with TailwindCSS

## ✨ Author

👨‍💻 **Aakash Tamboli**
