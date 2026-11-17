import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const SECRET = process.env.JWT_SECRET || "clinique_secret";

// Connexion : verifier email + mot de passe, retourner un token
export const login = async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;
        const utilisateur = await User.findOne({ where: { email } });
        if (!utilisateur) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }
        const motDePasseValide = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
        if (!motDePasseValide) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }
        const token = jwt.sign(
            { id: utilisateur.id, email: utilisateur.email, roleId: utilisateur.roleId },
            SECRET,
            { expiresIn: "1h" }
        );
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
