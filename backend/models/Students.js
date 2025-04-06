// models/Students.js
import mongoose from "mongoose";

const studentMongooseSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  roomNumber: { type: String },
  profilePic: { type: String },
  admissionDate: { type: Date, default: Date.now,required:true },
  totalFees: { type: Number, default: 12000 },  // Total fees
  paid: { type: Number, default: 0 },           // Paid so far
  remaining: { type: Number, default: 12000 }   // Remaining fees
});

const Student = mongoose.model("Student", studentMongooseSchema);

export default Student;
