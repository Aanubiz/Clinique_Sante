import { DataTypes } from "sequelize";
import database from "../config/connection.js";

const User = database.define("User", {
    nom: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    mot_de_passe: { type: DataTypes.STRING, allowNull: false },
    photo: DataTypes.STRING
})

export default User
