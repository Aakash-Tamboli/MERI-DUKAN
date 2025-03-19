import express from "express";
import {
  signup,
  login,
  logout,
  re_generateAccessToken,
  getProfile,
} from "../Controllers/Auth.js";
import { protectRoute } from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh-token", re_generateAccessToken);

router.get("/profile", protectRoute, getProfile);

export default router;
