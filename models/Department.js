import database from "../config/connection.js";
//Importer les types de donnees
import { DataTypes } from "sequelize";

const Department = database.define("Department", {
    nom: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: DataTypes.TEXT,
    image: DataTypes.STRING
})

export default Department