import express from "express";
import {
  deleteProfile,
  getUserProfile,
  resetPassword,
  updatePassword,
  updateUser,
} from "../controllers/user.controller.js";
import protectRoute from "../middlewares/protectRoutes.js";

const router = express.Router();

// routes
// GET USER || GET

router.get("/getUser", protectRoute, getUserProfile);

// update profile
router.put("/updateUser", protectRoute, updateUser);

// password update
router.post("/updatePassword", protectRoute, updatePassword);

// reset password
router.post("/resetPassword", protectRoute, resetPassword);

// delete user
router.delete("/deleteUser/:id", protectRoute, deleteProfile);
export default router;
