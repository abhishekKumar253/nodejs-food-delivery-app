import express from "express";
import protectRoute from "../middlewares/protectRoutes.js";
import {
  createCat,
  deleteCat,
  getAllCat,
  updateCat,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createCat);
router.get("/getAll", getAllCat);
router.put("/update/:id", protectRoute, updateCat);
router.delete("/delete/:id", protectRoute, deleteCat);

export default router;
