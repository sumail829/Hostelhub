import connectDB from "./configs/db.js";
import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import studentRoutes from "./routes/studentRoutes.js"
import roomRoutes from "./routes/roomRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import serviceRoutes from "./routes/serviceRoutes.js"
dotenv.config();
connectDB();

const app=express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true // if using cookies
  }));

app.use("/api", studentRoutes);
app.use("/api",roomRoutes);
app.use("/api",paymentRoutes);
app.use("/api",adminRoutes);
app.use("/api",serviceRoutes);

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
} )
