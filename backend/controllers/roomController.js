import Room from "../models/Rooms.js";
import Student from "../models/Students.js";
export const createRoom = async (req, res) => {
    try {
        const { roomNumber, capacity, occupied, students } = req.body;

        // Validation: Check if required fields are provided
        if (!roomNumber || !capacity || occupied === undefined) {
            return res.status(400).json({ message: "Please provide all required fields (roomNumber, capacity, and occupied)" });
        }

        // Check if room already exists (if you want to prevent duplicates)
        const existingRoom = await Room.findOne({ roomNumber });
        if (existingRoom) {
            return res.status(409).json({ message: "Room already exists with this room number" });
        }

        // Create and save the new room
        const newRoom = new Room({
            roomNumber,
            capacity,
            occupied,
            students: students || []
        });

        await newRoom.save();  // Save the room

        return res.status(201).json({ message: "New room created successfully", room: newRoom });

    } catch (error) {
        console.log("Something went wrong", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const enrollStudentInRoom = async (req, res) => {
    try {
        const { roomNumber, studentid } = req.body;  // Assuming you're passing roomId and studentId in the body

        // Find the room by ID
        const room = await Room.findOne({ roomNumber });

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        // Check if room is available (based on occupancy and capacity)
        if (room.occupied >= room.capacity) {
            return res.status(400).json({ message: "Room is full" });
        }

        // Find the student by ID
        const student = await Student.findById(studentid);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const alreadyEnrolled = await Room.findOne({ students: studentid });
        if (alreadyEnrolled) {
            return res.status(400).json({ message: "Student is already enrolled in a room" });
        }

        // Add student to the room
        room.students.push(studentid);
        room.occupied += 1;

        // Update room availability based on occupied count
        if (room.occupied >= room.capacity) {
            room.isAvailable = false;  // Mark room as full
        }

        await room.save();  // Save the updated room

        return res.status(200).json({
            message: "Student enrolled successfully",
            room: room
        });

    } catch (error) {
        console.log("Error enrolling student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllRoom = async (req, res) => {
    try {
        const getRoomInfo=await Room.find();
        return res.status(201).json({message:"fetched all Roominfo",roominfo:getRoomInfo})

    } catch (error) {
        console.log("Error enrolling student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

export const getSingleRoom = async (req, res) => {
    try {
        const getRoomInfo=await Room.findById(req.params.id);
        if(!getRoomInfo){
            return res.status(404).json({message:"Room not found"})
        }
        return res.status(201).json({message:"fetched single Roominfo",roominfo:getRoomInfo})

    } catch (error) {
        console.log("Error enrolling student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

export const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;

        // Optional: Prevent updates to fields like "_id" or "students" (if you want to keep it controlled)
        if (req.body.students) {
            return res.status(400).json({ message: "Use student enrollment API to update students" });
        }

        const modifyRoom = await Room.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true, // ✅ Ensures your schema validations still apply
        });

        if (!modifyRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        return res.status(200).json({
            message: "Room updated successfully",
            updatedRoom: modifyRoom,
        });

    } catch (error) {
        console.log("Error updating room:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteRoom=async(req,res)=>{
    try {
        const deletedRoom=await Room.findByIdAndDelete(req.params.id);
        if(!deletedRoom){
            return res.status(404).json({
                message:"No Room found"
            })

        }
        return res.status(200).json({message:"Room deleted successfully"});
        
    } catch (error) {
        console.log("Error updating room:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}
