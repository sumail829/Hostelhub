// models/Students.js
import mongoose from "mongoose";

const studentMongooseSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  roomNumber: { type: String },
  profilePic: { type: String },
  admissionDate: { type: Date, default: Date.now },
});

const Student = mongoose.model("Student", studentMongooseSchema);

export default Student;
