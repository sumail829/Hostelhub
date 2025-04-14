import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  type: { type: String, enum: ["veg", "nonVeg"], required: true },
  day: { type: String, enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], required: true },
  breakfast: { type: String, required: true },
  lunch: { type: String, required: true },
  dinner: { type: String, required: true }
});

export default mongoose.model("Meal", mealSchema);
