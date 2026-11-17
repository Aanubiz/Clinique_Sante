import express from "express";
import { getAllMedecins, getMedecinById, createMedecin, updateMedecin, deleteMedecin } from "../controllers/medecinController.js";
import { validateMedecin } from "../middleware/validation.js";
import { verifierToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllMedecins);
router.get("/:id", getMedecinById);
router.post("/", verifierToken, upload.single("photo"), validateMedecin, createMedecin);
router.put("/:id", verifierToken, upload.single("photo"), validateMedecin, updateMedecin);
router.delete("/:id", verifierToken, deleteMedecin);

export default router;
