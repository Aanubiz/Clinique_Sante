import express from "express";
import { getAllMedecins, getMedecinById, createMedecin, updateMedecin, deleteMedecin } from "../controllers/medecinController.js";
import { validateMedecin, validateMedecinUpdate } from "../middleware/validation.js";
import { verifierToken, verifierRole } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllMedecins);
router.get("/:id", getMedecinById);
router.post("/", verifierToken, verifierRole("administrateur", "secretaire"), upload.single("photo"), validateMedecin, createMedecin);
router.put("/:id", verifierToken, verifierRole("administrateur", "secretaire", "medecin"), upload.single("photo"), validateMedecinUpdate, updateMedecin);
router.delete("/:id", verifierToken, verifierRole("administrateur"), deleteMedecin);

export default router;
