// 📁 controllers/studentController.js
import Student from "../models/Students.js";
import { studentSchema, updateStudentSchema } from "../validators/studentValidator.js";

export const createStudent = async (req, res) => {
    try {
        const { error } = studentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { fullName, email, phone, roomNumber, profilePic, admissionDate } = req.body;

        const studentExist = await Student.findOne({ email });
        if (studentExist) {
            return res.status(409).json({ message: "Student already exists with this email" });
        }

        const newStudent = await new Student({
            fullName, email, phone, roomNumber, profilePic, admissionDate
        }).save();

        return res.status(201).json({
            message: "Student created successfully",
            student: newStudent
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        return res.status(200).json({ message: "Fetched all students", students });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getSingleStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json({ message: "Fetched student", student });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const { error } = updateStudentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const studentExist = await Student.findById(req.params.id);
        if (!studentExist) {
            return res.status(404).json({ message: "Student does not exist" });
        }

        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json({ message: "Student deleted successfully", student: deletedStudent });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
