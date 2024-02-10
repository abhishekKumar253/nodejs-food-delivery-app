import express from "express";
import {
  loginUser,
  logout,
  registerUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

// routes

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);

export default router;
