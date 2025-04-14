// 📁 controllers/studentController.js
import Student from "../models/Students.js";
import { studentSchema, updateStudentSchema } from "../validators/studentValidator.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

export const createStudent = async (req, res) => {
    try {
        const { error } = studentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { fullName, email, phone, roomNumber, profilePic, admissionDate, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const studentExist = await Student.findOne({ email });
        if (studentExist) {
            return res.status(409).json({ message: "Student already exists with this email" });
        }

        const newStudent = await new Student({
            fullName, email, phone, roomNumber, profilePic, admissionDate, password: hashedPassword
        }).save();

        const { password: _, ...studentWithoutPassword } = newStudent.toObject();

        // 🔐 Generate JWT token
        const jwtToken = jwt.sign(
            { id: newStudent._id, email: newStudent.email },
            "123124asdajsbdahjsbdajsb123",
            { expiresIn: "7d" }
        );

        return res.status(201).json({
            message: "Student created successfully",
            student: studentWithoutPassword,
            jwtToken
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        const studentExist = await Student.findOne({ email });
        if (!studentExist) {
            return res.status(404).json({ message: `No student registered with this ${email}` })
        }
        console.log("Entered password", req.body.password);
        console.log("hassed password", studentExist.password);
        const passwordMatch = await bcrypt.compare(password, studentExist.password)
        console.log("password matched", passwordMatch);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Wrong password" })
        }

        const jwtToken = jwt.sign({ id: studentExist._id, email: studentExist.email }, "123124asdajsbdahjsbdajsb123", { expiresIn: "7d" });
        console.log(jwtToken, "token generated")
        // Don't return the password in the response
        const { password: _, ...studentInfo } = studentExist.toObject();
        return res.status(200).json({
            message: "login successful",
            jwtToken: jwtToken,
            student: studentInfo
        })


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

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
