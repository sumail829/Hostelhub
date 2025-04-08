import express from "express";
import { createAdmin, deleteAdmin, getAdmin, getSingleAdmin, loginAdmin, updateAdmin } from "../controllers/adminController.js";
import verifyAdminToken from "../middleware/verifyAdminToken.js";

const router=express.Router();

router.post("/admin/createAdmin",createAdmin);
router.post("/admin/loginAdmin",loginAdmin);
router.get("/admin/getalladmin",verifyAdminToken,getAdmin)
router.get("/admin/getalladmin/:id",verifyAdminToken,getSingleAdmin);
router.patch("/admin/updateAdmin/:id",verifyAdminToken,updateAdmin);
router.delete("/admin/deleteAdmin/:id",verifyAdminToken,deleteAdmin)

export default router;