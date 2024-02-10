import express from "express";
import {
  createRestaurant,
  deleteRestaurant,
  getAllResturant,
  getRestaurantById,
} from "../controllers/resturant.controller.js";
import protectRoute from "../middlewares/protectRoutes.js";

const router = express.Router();

// create resturant || post
router.post("/create", protectRoute, createRestaurant);
router.get("/getAll", getAllResturant);
router.get("/get/:id", getRestaurantById);
router.delete("/delete/:id", protectRoute, deleteRestaurant);

export default router;
