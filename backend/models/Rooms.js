import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
    occupied: { type: Number, default: 0 },
    roomimage: { type: String },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    isAvailable: { type: Boolean, default: true }
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
