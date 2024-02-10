import express from "express";
import protectRoute from "../middlewares/protectRoutes.js";
import {
  createFood,
  deleteFood,
  getAllfoods,
  getFoodByRestaurants,
  getSinglefoods,
  orderStatus,
  placeOrder,
  updatefood,
} from "../controllers/food.controller.js";
import adminRoutes from "../middlewares/adminRoutes.js";

const router = express.Router();

router.post("/create", protectRoute, createFood);
router.get("/getAll", getAllfoods);
router.get("/get/:id", getSinglefoods);
router.get("/getByRestaurants/:id", getFoodByRestaurants);
router.put("/update/:id", protectRoute, updatefood);
router.delete("/delete/:id", protectRoute, deleteFood);
router.post("/placeorder", protectRoute, placeOrder);
router.post("/orderStatus/:id", protectRoute,adminRoutes, orderStatus);

export default router;
