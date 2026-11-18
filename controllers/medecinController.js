import Medecin from "../models/Medecin.js";

// Lister tous les medecins
export const getAllMedecins = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 10, 1);
        const medecins = await Medecin.findAndCountAll({ limit, offset: (page - 1) * limit });
        res.json({ page, limit, total: medecins.count, data: medecins.rows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Un seul medecin par id
export const getMedecinById = async (req, res) => {
    try {
        const medecin = await Medecin.findByPk(req.params.id);
        if (!medecin) {
            return res.status(404).json({ message: "Medecin non trouve" });
        }
        res.json(medecin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Creer un medecin
export const createMedecin = async (req, res) => {
    try {
        const photo = req.file ? req.file.filename : null;
        const medecin = await Medecin.create({ ...req.body, photo });
        res.status(201).json(medecin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Modifier un medecin
export const updateMedecin = async (req, res) => {
    try {
        const medecin = await Medecin.findByPk(req.params.id);
        if (!medecin) {
            return res.status(404).json({ message: "Medecin non trouve" });
        }
        const donnees = { ...req.body };
        if (req.file) {
            donnees.photo = req.file.filename;
        }
        await medecin.update(donnees);
        res.json(medecin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un medecin
export const deleteMedecin = async (req, res) => {
    try {
        const medecin = await Medecin.findByPk(req.params.id);
        if (!medecin) {
            return res.status(404).json({ message: "Medecin non trouve" });
        }
        await medecin.destroy();
        res.json({ message: "Medecin supprime" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
