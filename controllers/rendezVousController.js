import { Op } from "sequelize";
import RendezVous from "../models/RendezVous.js";

const findAppointment = (id) => RendezVous.findByPk(id, {
    include: [
        { association: "Patient" },
        { association: "Medecin" },
        { association: "Consultation" }
    ]
});

export const getAllRendezVous = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 10, 1);
        const rendezVous = await RendezVous.findAndCountAll({
            limit,
            offset: (page - 1) * limit,
            include: [
                { association: "Patient" },
                { association: "Medecin" }
            ]
        });
        res.json({ page, limit, total: rendezVous.count, data: rendezVous.rows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRendezVousById = async (req, res) => {
    try {
        const rendezVous = await findAppointment(req.params.id);
        if (!rendezVous) return res.status(404).json({ message: "Rendez-vous non trouve" });
        res.json(rendezVous);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createRendezVous = async (req, res) => {
    try {
        const rendezVous = await RendezVous.create(req.body);
        res.status(201).json(await findAppointment(rendezVous.id));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRendezVous = async (req, res) => {
    try {
        const rendezVous = await RendezVous.findByPk(req.params.id);
        if (!rendezVous) return res.status(404).json({ message: "Rendez-vous non trouve" });

        await rendezVous.update(req.body);

        if (rendezVous.statut === "annule" && rendezVous.medecinId) {
            const prochaineDemande = await RendezVous.findOne({
                where: {
                    medecinId: rendezVous.medecinId,
                    statut: "en_attente",
                    id: { [Op.ne]: rendezVous.id }
                },
                order: [["createdAt", "ASC"]]
            });
            if (prochaineDemande && rendezVous.date && rendezVous.heure) {
                await prochaineDemande.update({
                    date: rendezVous.date,
                    heure: rendezVous.heure,
                    statut: "confirme"
                });
            }
        }

        res.json(await findAppointment(rendezVous.id));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRendezVous = async (req, res) => {
    try {
        const rendezVous = await RendezVous.findByPk(req.params.id);
        if (!rendezVous) return res.status(404).json({ message: "Rendez-vous non trouve" });
        await rendezVous.destroy();
        res.json({ message: "Rendez-vous supprime" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
