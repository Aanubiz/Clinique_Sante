import express from "express";
import { getAllConsultations, getConsultationById, createConsultation, updateConsultation, deleteConsultation } from "../controllers/consultationController.js";
import { validateConsultation, validateConsultationUpdate } from "../middleware/validation.js";
import { verifierToken, verifierRole } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();
router.get("/", getAllConsultations);
router.get("/:id", getConsultationById);
router.post("/", verifierToken, verifierRole("administrateur", "medecin"), upload.single("document"), validateConsultation, createConsultation);
router.put("/:id", verifierToken, verifierRole("administrateur", "medecin"), upload.single("document"), validateConsultationUpdate, updateConsultation);
router.delete("/:id", verifierToken, verifierRole("administrateur"), deleteConsultation);

export default router;
