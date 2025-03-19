import express from "express";
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../Controllers/Cart.js";
import { protectRoute } from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/", protectRoute, addToCart);
router.put("/:productId", protectRoute, updateQuantity);
router.get("/", protectRoute, getCartProducts);
router.delete("/", protectRoute, removeAllFromCart);

export default router;