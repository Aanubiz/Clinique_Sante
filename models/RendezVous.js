import { DataTypes } from "sequelize";
import database from "../config/connection.js";

const RendezVous = database.define("RendezVous", {
    date: { type: DataTypes.DATEONLY, allowNull: true },
    heure: { type: DataTypes.TIME, allowNull: true },
    statut: {
        type: DataTypes.ENUM("en_attente", "confirme", "annule", "termine"),
        allowNull: false,
        defaultValue: "en_attente"
    }
}, {
    tableName: "RendezVous"
});

export default RendezVous;
