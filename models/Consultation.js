import { DataTypes } from "sequelize";
import database from "../config/connection.js";

const Consultation = database.define("Consultation", {
    description: { type: DataTypes.TEXT, allowNull: false },
    instructions: { type: DataTypes.TEXT, allowNull: true },
    document: { type: DataTypes.STRING, allowNull: true }
}, {
    tableName: "Consultations"
});

export default Consultation;
