import express from "express"

import { createRoom,deleteRoom,enrollStudentInRoom, getAllRoom, getSingleRoom, updateRoom } from "../controllers/roomController.js"
import { verifyStudentToken } from "../middleware/verifyStudentToken.js";

const router=express.Router();

router.post("/rooms",createRoom);
router.post("/enroll",verifyStudentToken,enrollStudentInRoom);
router.get("/rooms",getAllRoom);
router.get("/rooms/:id",getSingleRoom);
router.patch("/rooms/:id",updateRoom);
router.delete("/rooms/:id",deleteRoom);


export default router;