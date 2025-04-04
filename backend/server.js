import connectDB from "./configs/db.js";
import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import studentRoutes from "./routes/studentRoutes.js"


dotenv.config();
connectDB();

const app=express();
app.use(express.json());

app.use(cors());

app.use("/api", studentRoutes);

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
} )
