import express from "express"

import { createRoom,deleteRoom,enrollStudentInRoom, getAllRoom, getSingleRoom, updateRoom } from "../controllers/roomController.js"

const router=express.Router();

router.post("/rooms",createRoom);
router.post("/enroll",enrollStudentInRoom);
router.get("/rooms",getAllRoom);
router.get("/rooms/:id",getSingleRoom);
router.patch("/rooms/:id",updateRoom);
router.delete("/rooms/:id",deleteRoom);


export default router;