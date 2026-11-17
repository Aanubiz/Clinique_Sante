import bcrypt from "bcryptjs";
import User from "../models/User.js";

// Lister tous les utilisateurs
export const getAllUtilisateurs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const utilisateurs = await User.findAll({ limit, offset });
        res.json(utilisateurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Un seul utilisateur par id
export const getUtilisateurById = async (req, res) => {
    try {
        const utilisateur = await User.findByPk(req.params.id);
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouve" });
        }
        res.json(utilisateur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Creer un utilisateur

export const createUtilisateur = async (req, res) => {
    try {
        const { mot_de_passe, ...reste } = req.body;
        const motDePasseHache = await bcrypt.hash(mot_de_passe, 10);
        const photo = req.file ? req.file.filename : null;
        const utilisateur = await User.create({ ...reste, mot_de_passe: motDePasseHache, photo });
        res.status(201).json(utilisateur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Modifier un utilisateur
export const updateUtilisateur = async (req, res) => {
    try {
        const utilisateur = await User.findByPk(req.params.id);
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouve" });
        }
        const donnees = { ...req.body };
        if (req.file) {
            donnees.photo = req.file.filename;
        }
        await utilisateur.update(donnees);
        res.json(utilisateur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Supprimer un utilisateur
export const deleteUtilisateur = async (req, res) => {
    try {
        const utilisateur = await User.findByPk(req.params.id);
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouve" });
        }
        await utilisateur.destroy();
        res.json({ message: "Utilisateur supprime" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
