import { DataTypes } from "sequelize";
import database from "../config/connection.js";

const Patient = database.define("Patient", {
    date_naissance: { type: DataTypes.DATEONLY, allowNull: false },
    sexe: { type: DataTypes.STRING, allowNull: false },
    telephone: { type: DataTypes.STRING, allowNull: false },
    adresse: { type: DataTypes.STRING, allowNull: false },
    numero_assurance_maladie: { type: DataTypes.STRING, allowNull: false, unique: true },
    allergies: DataTypes.TEXT,
    antecedents: DataTypes.TEXT
})

export default Patient
