import User from "../models/User.js";

// Lister tous les utilisateurs
export const getAllUtilisateurs = async (req, res) => {
    try {
        const utilisateurs = await User.findAll();
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
        const utilisateur = await User.create(req.body);
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
        await utilisateur.update(req.body);
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
