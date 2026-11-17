import express from "express";
import { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient } from "../controllers/patientController.js";
import { validatePatient } from "../middleware/validation.js";
import { verifierToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.post("/", verifierToken, validatePatient, createPatient);
router.put("/:id", verifierToken, validatePatient, updatePatient);
router.delete("/:id", verifierToken, deletePatient);

export default router;
