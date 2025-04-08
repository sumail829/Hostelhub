import connectDB from "./configs/db.js";
import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import studentRoutes from "./routes/studentRoutes.js"
import roomRoutes from "./routes/roomRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"

dotenv.config();
connectDB();

const app=express();
app.use(express.json());

app.use(cors());

app.use("/api", studentRoutes);
app.use("/api",roomRoutes);
app.use("/api",paymentRoutes);
app.use("/api",adminRoutes);

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
} )
