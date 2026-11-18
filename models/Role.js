import database from "../config/connection.js";
//Importer les types de donnees
import { DataTypes } from "sequelize";

const Role = database.define("Role", {
    nom: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: true }
})

export default Role