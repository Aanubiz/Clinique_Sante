 //Importer les modeles sans relations
import User from "./User.js";
import Department from "./Department.js";
import Role from "./Role.js";
import Patient from "./Patient.js";
import Medecin from "./Medecin.js";

//Ajouter les relations
// Un role a plusieurs utilisateurs, un utilisateur a un seul role
Role.hasMany(User)
User.belongsTo(Role)

// Un utilisateur a un seul patient, un patient appartient a un seul utilisateur
User.hasOne(Patient)
Patient.belongsTo(User)

// Un utilisateur a un seul medecin, un medecin appartient a un seul utilisateur
User.hasOne(Medecin)
Medecin.belongsTo(User)

// Un departement a plusieurs medecins, un medecin appartient a un seul departement
Department.hasMany(Medecin)
Medecin.belongsTo(Department)

export { User, Department, Role, Patient, Medecin }
