import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    month: { type: String, required: true }, // e.g., "April 2025"
    totalAmount: { type: Number, default: 12000 },
    paidAmount: { type: Number, default: 0 },
    remainingAmount: { type: Number, default: 12000 },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    transactions: [
        {
            amount: Number,
            method: String,
            date: { type: Date, default: Date.now }
        }
    ]
});

export default mongoose.model("Payment", paymentSchema);
