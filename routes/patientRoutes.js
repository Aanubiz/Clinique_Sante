import express from "express";
import { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient } from "../controllers/patientController.js";
import { validatePatient, validatePatientUpdate } from "../middleware/validation.js";
import { verifierToken, verifierRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.post("/", verifierToken, verifierRole("administrateur", "secretaire"), validatePatient, createPatient);
router.put("/:id", verifierToken, verifierRole("administrateur", "secretaire", "medecin"), validatePatientUpdate, updatePatient);
router.delete("/:id", verifierToken, verifierRole("administrateur"), deletePatient);

export default router;
