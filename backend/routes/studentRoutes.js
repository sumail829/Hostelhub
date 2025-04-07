// 📁 routes/student.js
import express from "express";
import {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  loginStudent
} from "../controllers/studentController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/students/signup",createStudent);
router.post("/auth/login",loginStudent);
router.get("/students",verifyToken, getAllStudents);
router.get("/students/:id",verifyToken, getSingleStudent);
router.patch("/students/:id",verifyToken, updateStudent);
router.delete("/students/:id",verifyToken, deleteStudent);

export default router;
