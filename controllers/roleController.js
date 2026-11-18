import Role from "../models/Role.js";

export const getAllRoles = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 10, 1);
        const roles = await Role.findAndCountAll({ limit, offset: (page - 1) * limit });
        res.json({ page, limit, total: roles.count, data: roles.rows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRoleById = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) return res.status(404).json({ message: "Role non trouve" });
        res.json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createRole = async (req, res) => {
    try {
        res.status(201).json(await Role.create(req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRole = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) return res.status(404).json({ message: "Role non trouve" });
        res.json(await role.update(req.body));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRole = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) return res.status(404).json({ message: "Role non trouve" });
        await role.destroy();
        res.json({ message: "Role supprime" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
