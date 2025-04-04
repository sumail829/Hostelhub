import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" }
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
