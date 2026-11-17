import express from "express";
import { getAllUtilisateurs, getUtilisateurById, createUtilisateur, updateUtilisateur, deleteUtilisateur } from "../controllers/utilisateurController.js";
import { validateUtilisateur } from "../middleware/validation.js";
import { verifierToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllUtilisateurs);
router.get("/:id", getUtilisateurById);
router.post("/", upload.single("photo"), validateUtilisateur, createUtilisateur);
router.put("/:id", verifierToken, upload.single("photo"), validateUtilisateur, updateUtilisateur);
router.delete("/:id", verifierToken, deleteUtilisateur);

export default router;
