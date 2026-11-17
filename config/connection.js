//Importer l'ORM
import { Sequelize } from "sequelize";

//Importer les informations de connexion
import dotenv from "dotenv"

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT } = dotenv.config().parsed

//Creation de la connexion
const database = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    //port: DB_PORT
})

export default database