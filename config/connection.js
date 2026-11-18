//Importer l'ORM
import { Sequelize } from "sequelize";

//Importer les informations de connexion
import dotenv from "dotenv"

dotenv.config();

const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST = "localhost",
    DB_PORT,
    DB_DIALECT = "mysql"
} = process.env

//Creation de la connexion
const database = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT ? Number(DB_PORT) : undefined
})

export default database