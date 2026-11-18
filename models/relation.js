 //Importer les modeles sans relations
import User from "./User.js";
import Department from "./Department.js";
import Role from "./Role.js";
import Patient from "./Patient.js";
import Medecin from "./Medecin.js";
import RendezVous from "./RendezVous.js";
import Consultation from "./Consultation.js";
import JournalAcces from "./JournalAcces.js";

//Ajouter les relations
// Un role a plusieurs utilisateurs, un utilisateur a un seul role
Role.hasMany(User, { foreignKey: "roleId" })
User.belongsTo(Role, { foreignKey: "roleId", as: "Role" })

// Un utilisateur a un seul patient, un patient appartient a un seul utilisateur
User.hasOne(Patient, { foreignKey: "utilisateurId", as: "Patient" })
Patient.belongsTo(User, { foreignKey: "utilisateurId", as: "Utilisateur" })

// Un utilisateur a un seul medecin, un medecin appartient a un seul utilisateur
User.hasOne(Medecin, { foreignKey: "utilisateurId", as: "Medecin" })
Medecin.belongsTo(User, { foreignKey: "utilisateurId", as: "Utilisateur" })

// Un departement a plusieurs medecins, un medecin appartient a un seul departement
Department.hasMany(Medecin, { foreignKey: "departementId", as: "Medecins" })
Medecin.belongsTo(Department, { foreignKey: "departementId", as: "Department" })

// Un patient peut avoir plusieurs rendez-vous
Patient.hasMany(RendezVous, { foreignKey: "patientId", as: "RendezVous" })
RendezVous.belongsTo(Patient, { foreignKey: "patientId", as: "Patient" })

// Un medecin peut assurer plusieurs rendez-vous
Medecin.hasMany(RendezVous, { foreignKey: "medecinId", as: "RendezVous" })
RendezVous.belongsTo(Medecin, { foreignKey: "medecinId", as: "Medecin" })

// Un rendez-vous donne au plus une consultation
RendezVous.hasOne(Consultation, { foreignKey: "rendezVousId", as: "Consultation" })
Consultation.belongsTo(RendezVous, { foreignKey: "rendezVousId", unique: true, as: "RendezVous" })

// Une entree du journal appartient a un utilisateur et a un patient
User.hasMany(JournalAcces, { foreignKey: "utilisateurId", as: "JournalAcces" })
JournalAcces.belongsTo(User, { foreignKey: "utilisateurId", as: "Utilisateur" })

Patient.hasMany(JournalAcces, { foreignKey: "patientId", as: "JournalAcces" })
JournalAcces.belongsTo(Patient, { foreignKey: "patientId", as: "Patient" })

export {
    User,
    Department,
    Role,
    Patient,
    Medecin,
    RendezVous,
    Consultation,
    JournalAcces
}
