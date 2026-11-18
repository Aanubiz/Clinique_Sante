import Department from "../models/Department.js";

export const getAllDepartments = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 10, 1);
        const departments = await Department.findAndCountAll({ limit, offset: (page - 1) * limit });
        res.json({ page, limit, total: departments.count, data: departments.rows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if (!department) return res.status(404).json({ message: "Departement non trouve" });
        res.json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createDepartment = async (req, res) => {
    try {
        const image = req.file ? req.file.filename : null;
        res.status(201).json(await Department.create({ ...req.body, image }));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateDepartment = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if (!department) return res.status(404).json({ message: "Departement non trouve" });
        const donnees = { ...req.body };
        if (req.file) donnees.image = req.file.filename;
        res.json(await department.update(donnees));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if (!department) return res.status(404).json({ message: "Departement non trouve" });
        await department.destroy();
        res.json({ message: "Departement supprime" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
