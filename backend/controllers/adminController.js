import express from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import 'dotenv/config'

export const createAdmin=async(req,res)=>{
    try {
       const{name, email,password}=req.body;

        const adminExist=await Admin.findOne({email});
        if(adminExist){
            return res.status(409).json({message:"Admin already exist"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)
        const newAdmin= await new Admin({
            name,
            email,
            password:hashedPassword,
            role: "admin"
        }).save();
        return res.status(201).json({message:"Admin created",admin:newAdmin})
    } catch (error) {
        console.log("something went wrong",error)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const loginAdmin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const admin=await Admin.findOne({email});
        if(!admin){
            return res.status(404).json({message:"Admin not found"})
        };
        const isMatch=await bcrypt.compare(password,admin.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credential"});
        }
        const token=jwt.sign({id:admin._id,email:admin.email,role:"admin"},process.env.JWT_ADTOKEN,{
            expiresIn:"7d",
        });
        const { password: _, ...adminData } = admin._doc;
        return res.status(200).json({message:"Login successful",token,admin:adminData})
    } catch (error) {
        console.log("something went wrong",error)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const getAdmin=async(req,res)=>{
    try {
        const getAllAdmin=await Admin.find();
        // if(!getAllAdmin){
        //     return res.status(404).json({message:"No admin registered yet"});

        // }
        if (getAllAdmin.length === 0) {
            return res.status(404).json({ message: "No admin registered yet" });
          }
        return res.status(200).json({message:"fetched all admin",fetchedadmin:getAllAdmin});
        
    } catch (error) {
        console.log("something went wrong",error)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const getSingleAdmin=async(req,res)=>{
    try {
        const singleAdmin=await Admin.findById(req.params.id);
        if(!singleAdmin){
            return res.status(404).json({message:"Admin not found"});

        }
        return res.status(200).json({message:"fetched single admin",fetchedadmin:singleAdmin});
        
    } catch (error) {
        console.log("something went wrong",error)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const updateAdmin=async(req,res)=>{
    try {

        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid admin id"})
        }
    
        if(req.body.password){
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt)
        }
        const modifyAdmin=await Admin.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!modifyAdmin){
            return res.status(404).json({message:"No admin found"})
        }
        return res.status(200).json({message:"Admin updated successfully",updatedAdmin:modifyAdmin})
    } catch (error) {
        console.log("something went wrong",error)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const deleteAdmin = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid admin ID" });
      }
  
      const deletedAdmin = await Admin.findByIdAndDelete(id);
  
      if (!deletedAdmin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      return res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
      console.log("Something went wrong:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };