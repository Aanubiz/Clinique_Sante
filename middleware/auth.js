import jwt from "jsonwebtoken";
import Role from "../models/Role.js";

const SECRET = process.env.JWT_SECRET || "clinique_secret";

// Verifier le token JWT
export const verifierToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token manquant" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET);
        req.utilisateur = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide" });
    }
};

export const verifierRole = (...rolesAutorises) => async (req, res, next) => {
    try {
        if (!req.utilisateur?.roleId) {
            return res.status(403).json({ message: "Rôle requis" });
        }
        const role = await Role.findByPk(req.utilisateur.roleId);
        const roleNom = role?.nom === "admin" ? "administrateur" : role?.nom;
        if (!roleNom || !rolesAutorises.includes(roleNom)) {
            return res.status(403).json({ message: "Accès interdit pour ce rôle" });
        }
        req.utilisateur.role = roleNom;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default verifierToken;
