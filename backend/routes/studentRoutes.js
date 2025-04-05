// 📁 routes/student.js
import express from "express";
import {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/students", createStudent);
router.get("/students", getAllStudents);
router.get("/students/:id", getSingleStudent);
router.patch("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

export default router;
