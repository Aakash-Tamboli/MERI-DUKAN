import express from "express";
import dotEnv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./Routes/Auth.js";
import productRoutes from "./Routes/Product.js";
import cartRoutes from "./Routes/Cart.js";
import { connectDB } from "./Libs/DB.js";
import couponRoutes from "./Routes/Coupon.js";
import paymentRoutes from "./Routes/Payment.js";
import analyticsRoutes from "./Routes/Analytics.js";

dotEnv.config();

const app = express();

const __dirname = path.resolve(); // it will give us a absolute path which is location of where our server is running.

app.use(express.json({ limit: "10mb" })); // this allows us to parse json in the request body
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

if (process.env.NODE_ENV === "production") {
  // So we treat our react application as static asset hence whenver any request is arrived at
  // our server excepts above end points we will be showing our react application to client.

  app.use(express.static(path.join(__dirname, "/client-app/dist"))); // setting react app as static

  // showing react app
  app.get("*", function (request, response) {
    response.sendFile(
      path.resolve(__dirname, "client-app", "dist", "index.html")
    );
  });
}

connectDB(app);
