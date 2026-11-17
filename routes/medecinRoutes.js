import express from "express";
import { getAllMedecins, getMedecinById, createMedecin, updateMedecin, deleteMedecin } from "../controllers/medecinController.js";

const router = express.Router();

router.get("/", getAllMedecins);
router.get("/:id", getMedecinById);
router.post("/", createMedecin);
router.put("/:id", updateMedecin);
router.delete("/:id", deleteMedecin);

export default router;
