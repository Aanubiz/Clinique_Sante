import express from "express";
import { getAllJournalAcces, getJournalAccesById, createJournalAcces, deleteJournalAcces } from "../controllers/journalAccesController.js";
import { validateJournalAcces } from "../middleware/validation.js";
import { verifierToken, verifierRole } from "../middleware/auth.js";

const router = express.Router();
router.get("/", verifierToken, verifierRole("administrateur", "medecin"), getAllJournalAcces);
router.get("/:id", verifierToken, verifierRole("administrateur", "medecin"), getJournalAccesById);
router.post("/", verifierToken, verifierRole("administrateur", "medecin", "secretaire"), validateJournalAcces, createJournalAcces);
router.delete("/:id", verifierToken, verifierRole("administrateur"), deleteJournalAcces);

export default router;
