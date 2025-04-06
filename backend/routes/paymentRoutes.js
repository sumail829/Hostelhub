import express from "express";
import { createOrUpdatePayment, getAllPaymentsOfStudent, getPaymentsByStudent } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/payments", createOrUpdatePayment);
router.get("/payments/:studentId", getPaymentsByStudent);
router.get("/payments",getAllPaymentsOfStudent);

export default router;
