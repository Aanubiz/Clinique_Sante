import { DataTypes } from "sequelize";
import database from "../config/connection.js";

const Medecin = database.define("Medecin", {
    numero_licence: { type: DataTypes.STRING, allowNull: false, unique: true },
    telephone: { type: DataTypes.STRING, allowNull: false },
    photo: DataTypes.STRING
})

export default Medecin
