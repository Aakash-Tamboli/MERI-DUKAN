import express from "express";
import { protectRoute } from "../Middlewares/Auth.js";
import { checkoutSuccess, createCheckoutSession } from "../Controllers/Payment.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/checkout-success", protectRoute, checkoutSuccess);


export default router;