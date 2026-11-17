import Patient from "../models/Patient.js";

// Lister tous les patients
export const getAllPatients = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const patients = await Patient.findAll({ limit, offset });
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Un seul patient par id
export const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient non trouve" });
        }
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Creer un patient
export const createPatient = async (req, res) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Modifier un patient
export const updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient non trouve" });
        }
        await patient.update(req.body);
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un patient
export const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient non trouve" });
        }
        await patient.destroy();
        res.json({ message: "Patient supprime" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
