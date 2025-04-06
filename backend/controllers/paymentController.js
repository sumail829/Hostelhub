import Payment from "../models/Payment.js";
import Student from "../models/Students.js";
import moment from "moment";

export const createOrUpdatePayment = async (req, res) => {
    try {
        const { studentId, amount, method } = req.body;

        if (!studentId || !amount || !method) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Get current month string (e.g., "April 2025")
        const currentMonth = moment().format("MMMM YYYY");

        // Find existing payment record for this student and month
        let payment = await Payment.findOne({ student: studentId, month: currentMonth });

        if (!payment) {
            // No record yet, create one
            payment = new Payment({
                student: studentId,
                month: currentMonth,
                transactions: [],
            });
        }

        // Add transaction
        payment.transactions.push({
            amount,
            method,
            date: new Date()
        });

        // Update paid and remaining
        payment.paidAmount += amount;
        payment.remainingAmount = Math.max(0, payment.totalAmount - payment.paidAmount);
        payment.status = payment.remainingAmount === 0 ? "completed" : "pending";

        await payment.save();

        return res.status(200).json({
            message: "Payment recorded successfully",
            payment
        });

    } catch (error) {
        console.error("Error in payment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllPaymentsOfStudent = async (req, res) => {
    try {
        const payments = await Payment.find();

        return res.status(200).json({ payments });
    } catch (error) {
        console.error("Error fetching payments:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getPaymentsByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const payments = await Payment.find({ student: studentId }).sort({ month: -1 });

        return res.status(200).json({ payments });
    } catch (error) {
        console.error("Error fetching payments:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
