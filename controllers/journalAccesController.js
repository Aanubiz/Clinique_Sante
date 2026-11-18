import JournalAcces from "../models/JournalAcces.js";

export const getAllJournalAcces = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 10, 1);
        const entries = await JournalAcces.findAndCountAll({
            limit,
            offset: (page - 1) * limit,
            include: [
                { association: "Utilisateur" },
                { association: "Patient" }
            ]
        });
        res.json({ page, limit, total: entries.count, data: entries.rows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getJournalAccesById = async (req, res) => {
    try {
        const entree = await JournalAcces.findByPk(req.params.id, {
            include: [
                { association: "Utilisateur" },
                { association: "Patient" }
            ]
        });
        if (!entree) return res.status(404).json({ message: "Entree de journal non trouvee" });
        res.json(entree);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createJournalAcces = async (req, res) => {
    try {
        res.status(201).json(await JournalAcces.create(req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteJournalAcces = async (req, res) => {
    try {
        const entree = await JournalAcces.findByPk(req.params.id);
        if (!entree) return res.status(404).json({ message: "Entree de journal non trouvee" });
        await entree.destroy();
        res.json({ message: "Entree du journal supprimee" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
