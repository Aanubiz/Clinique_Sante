import express from "express";
import { getAllUtilisateurs, getUtilisateurById, createUtilisateur, updateUtilisateur, deleteUtilisateur } from "../controllers/utilisateurController.js";

const router = express.Router();

router.get("/", getAllUtilisateurs);
router.get("/:id", getUtilisateurById);
router.post("/", createUtilisateur);
router.put("/:id", updateUtilisateur);
router.delete("/:id", deleteUtilisateur);

export default router;
