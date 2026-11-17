import database from "../config/connection.js";
//Importer les types de donnees
import { DataTypes } from "sequelize";

const Role = database.define("Role", {
    titre: { type: DataTypes.STRING, allowNull: false, unique }
})

export default Role