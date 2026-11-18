import express from "express";
import { getAllRendezVous, getRendezVousById, createRendezVous, updateRendezVous, deleteRendezVous } from "../controllers/rendezVousController.js";
import { validateRendezVous, validateRendezVousUpdate } from "../middleware/validation.js";
import { verifierToken, verifierRole } from "../middleware/auth.js";

const router = express.Router();
router.get("/", getAllRendezVous);
router.get("/:id", getRendezVousById);
router.post("/", verifierToken, verifierRole("administrateur", "secretaire", "patient"), validateRendezVous, createRendezVous);
router.put("/:id", verifierToken, verifierRole("administrateur", "secretaire", "medecin"), validateRendezVousUpdate, updateRendezVous);
router.delete("/:id", verifierToken, verifierRole("administrateur", "secretaire"), deleteRendezVous);

export default router;
