import express from "express";
import { protectRoute } from "../Middlewares/Auth.js";
import { getCoupon, validateCoupon } from "../Controllers/Coupon.js";

const router = express.Router();

router.get("/", protectRoute, getCoupon)
router.post("/validate", protectRoute, validateCoupon);

export default router;