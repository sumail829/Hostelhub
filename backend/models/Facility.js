import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }, // store string name of the icon like "Wifi", "Zap", etc.
  details: [{ type: String, required: true }]
});

export default mongoose.model("Facility", facilitySchema);
