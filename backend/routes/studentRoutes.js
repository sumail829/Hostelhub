import express from "express"
import Student from "../models/Students.js"

const router = express.Router();

//create a new student route

router.post('/students', async (req, res) => {
    try {
        const { fullName, email, phone, roomNumber, profilePic, addmissionDate } = req.body;

        //check email if exist
        const studentExist = await Student.findOne({ email });
        if (studentExist) {
            return res.status(409).json({ message: "Student already existed with this email" });
        }

        const newStudent = await new Student({ fullName, email, phone, roomNumber, profilePic, addmissionDate }).save();
        return res.status(200).json({
            message: "user created successfully",
            newStudent: newStudent
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })

    }
})

router.get('/students', async (req, res) => {
    try {
        const fetchStudents = await Student.find();
        return res.status(200).json({
            message: "fetched all students",
            students: fetchStudents
        })
    } catch (error) {
        console.log("something went wrong", error);
        return res.status(500).json({ message: "Internal server error" })

    }
})

router.get('/students/:id', async (req, res) => {
    try {
        const singleStudent = await Student.findById(req.params.id);
        return res.status(200).json({
            message: "Single student fetched successfully",
            student: singleStudent
        })
    } catch (error) {
        console.log("something went wrong", error);
        return res.status(500).json({ message: "Internal server error" })
    }
})

router.patch("/students/:id", async (req, res) => {
    try {
        const studentExist=await Student.findById(req.params.id);
        if(!studentExist){
            return res.status(404).json({message:"student doesnot exist"})
        }

        const updateUser=await Student.findByIdAndUpdate(req.params.id,req.body,{new:true}) //new true update the new value
        return res.status(200).json({message:"student updated successfully",updatestudent:updateUser})

    } catch (error) {
        console.log("something went wrong", error);
        return res.status(500).json({ message: "Internal server error" })
    }
})

 router.delete("/students/:id",async(req,res)=>{
    try {
        const deletStudent=await Student.findByIdAndDelete(req.params.id)
        if(!deletStudent){
            return res.status(404).json({message:"student didnt found"})
        }
        return res.status(200).json({message:"student deleted successfully",deletStudent:deletStudent})
        
    } catch (error) {
        console.log("something went wrong", error);
        return res.status(500).json({ message: "Internal server error" })
    }
 })
export default router;