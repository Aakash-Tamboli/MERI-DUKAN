import express from "express";
import { adminRoute, protectRoute } from "../Middlewares/Auth.js";
import { getAnalytics } from "../Controllers/Analytics.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAnalytics);

export default router;