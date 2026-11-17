import express from "express"
import compression from "compression"
import helmet from "helmet"
import cors from "cors"
import database from "./config/connection.js"

try {
  await database.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
// Creaion du serveur
const app = express()


//Ajout des middlewares
app.use(compression())
app.use(helmet())
app.use(cors())


const PORT= 5000

//Lancement du serveur
app.listen(PORT,()=>console.log(`Le serveur tourne sur le port ${PORT}`))