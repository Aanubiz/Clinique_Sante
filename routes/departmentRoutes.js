import express from "express";
import { getAllDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment } from "../controllers/departmentController.js";
import { validateDepartment, validateDepartmentUpdate } from "../middleware/validation.js";
import { verifierToken, verifierRole } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();
router.get("/", getAllDepartments);
router.get("/:id", getDepartmentById);
router.post("/", verifierToken, verifierRole("administrateur"), upload.single("image"), validateDepartment, createDepartment);
router.put("/:id", verifierToken, verifierRole("administrateur"), upload.single("image"), validateDepartmentUpdate, updateDepartment);
router.delete("/:id", verifierToken, verifierRole("administrateur"), deleteDepartment);

export default router;
