import express from "express"
import compression from "compression"
import helmet from "helmet"
import cors from "cors"
import database from "./config/connection.js"
import "./models/relation.js"
import utilisateurRoutes from "./routes/utilisateurRoutes.js"
import patientRoutes from "./routes/patientRoutes.js"
import medecinRoutes from "./routes/medecinRoutes.js"

try {
    await database.authenticate();
    console.log('Connection has been established successfully.');
    await database.sync();
    console.log('Les tables sont synchronisees.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// Creation du serveur
const app = express()

//Ajout des middlewares
app.use(compression())
app.use(helmet())
app.use(cors())
app.use(express.json())

// Les routes
app.use("/api/utilisateurs", utilisateurRoutes)
app.use("/api/patients", patientRoutes)
app.use("/api/medecins", medecinRoutes)

const PORT= 5000

//Lancement du serveur
app.listen(PORT,()=>console.log(`Le serveur tourne sur le port ${PORT}`))
