import express from "express";
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole } from "../controllers/roleController.js";
import { validateRole, validateRoleUpdate } from "../middleware/validation.js";
import { verifierToken, verifierRole } from "../middleware/auth.js";

const router = express.Router();
router.get("/", getAllRoles);
router.get("/:id", getRoleById);
router.post("/", verifierToken, verifierRole("administrateur"), validateRole, createRole);
router.put("/:id", verifierToken, verifierRole("administrateur"), validateRoleUpdate, updateRole);
router.delete("/:id", verifierToken, verifierRole("administrateur"), deleteRole);

export default router;
