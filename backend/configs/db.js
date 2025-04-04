import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("database connection successfull")
    } catch (error) {
        console.log("Database connection error",error)
    }
}

export default connectDB;