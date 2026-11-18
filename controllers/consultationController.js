import Consultation from "../models/Consultation.js";

const findConsultation = (id) => Consultation.findByPk(id, { include: [{ association: "RendezVous" }] });

export const getAllConsultations = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 10, 1);
        const consultations = await Consultation.findAndCountAll({
            limit,
            offset: (page - 1) * limit,
            include: [{ association: "RendezVous" }]
        });
        res.json({ page, limit, total: consultations.count, data: consultations.rows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getConsultationById = async (req, res) => {
    try {
        const consultation = await findConsultation(req.params.id);
        if (!consultation) return res.status(404).json({ message: "Consultation non trouvee" });
        res.json(consultation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createConsultation = async (req, res) => {
    try {
        const document = req.file ? req.file.filename : null;
        const consultation = await Consultation.create({ ...req.body, document });
        res.status(201).json(await findConsultation(consultation.id));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateConsultation = async (req, res) => {
    try {
        const consultation = await Consultation.findByPk(req.params.id);
        if (!consultation) return res.status(404).json({ message: "Consultation non trouvee" });
        const donnees = { ...req.body };
        if (req.file) donnees.document = req.file.filename;
        await consultation.update(donnees);
        res.json(await findConsultation(consultation.id));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteConsultation = async (req, res) => {
    try {
        const consultation = await Consultation.findByPk(req.params.id);
        if (!consultation) return res.status(404).json({ message: "Consultation non trouvee" });
        await consultation.destroy();
        res.json({ message: "Consultation supprimee" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
