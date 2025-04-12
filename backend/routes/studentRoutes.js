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
import { verifyStudentToken } from "../middleware/verifyStudentToken.js";
import verifyAdminToken from "../middleware/verifyAdminToken.js";

const router = express.Router();

router.post("/students/signup",createStudent);
router.post("/auth/login",loginStudent);
router.get("/students/:id",verifyStudentToken, getSingleStudent);
router.patch("/students/:id",verifyStudentToken, updateStudent);
router.delete("/students/:id",verifyStudentToken, deleteStudent);

router.get("/students",verifyAdminToken, getAllStudents);

export default router;
