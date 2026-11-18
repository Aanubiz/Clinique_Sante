import { DataTypes } from "sequelize";
import database from "../config/connection.js";

const JournalAcces = database.define("JournalAcces", {
    action: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
    tableName: "JournalAcces"
});

export default JournalAcces;
