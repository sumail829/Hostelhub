import express from "express";
import {
  createMeal,
  getMeals,
  updateMeal,
  deleteMeal,
  createFacility,
  getFacilities,
  updateFacility,
  deleteFacility
} from "../controllers/serviceController.js";

const router = express.Router();

// Meal Routes
router.post("/meals", createMeal);
router.get("/meals", getMeals);
router.patch("/meals/:id", updateMeal);
router.delete("/meals/:id", deleteMeal);

// Facility Routes
router.post("/facilities", createFacility);
router.get("/facilities", getFacilities);
router.patch("/facilities/:id", updateFacility);
router.delete("/facilities/:id", deleteFacility);

export default router;
