import express from "express";
import { getAllUtilisateurs, getUtilisateurById, createUtilisateur, updateUtilisateur, deleteUtilisateur } from "../controllers/utilisateurController.js";
import { validateUtilisateur, validateUtilisateurUpdate } from "../middleware/validation.js";
import { verifierToken, verifierRole } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllUtilisateurs);
router.get("/:id", getUtilisateurById);
router.post("/", upload.single("photo"), validateUtilisateur, createUtilisateur);
router.put("/:id", verifierToken, verifierRole("administrateur"), upload.single("photo"), validateUtilisateurUpdate, updateUtilisateur);
router.delete("/:id", verifierToken, verifierRole("administrateur"), deleteUtilisateur);

export default router;
