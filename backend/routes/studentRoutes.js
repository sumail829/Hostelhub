import express from "express"
import Student from "../models/Students.js"

const router=express.Router();

//create a new student route

router.post('/student',async(req,res)=>{
    try {
        const{fullName,email,phone,roomNumber,profilePic,addmissionDate}=req.body;

        //check email if exist
       const studentExist=await Student.findOne({email});
       if(studentExist){
        return res.status(409).json({message:"Student already existed with this email"});
       }

       const newStudent=await new Student({fullName,email,phone,roomNumber,profilePic,addmissionDate}).save();
       return res.status(200).json({
        message:"user created successfully",
        newStudent:newStudent})

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
        
    }
})
export default router;