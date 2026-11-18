import { body, validationResult } from "express-validator";

// Verifier les erreurs de validation
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation pour creer un utilisateur
export const validateUtilisateur = [
    body("nom").notEmpty().withMessage("Le nom est obligatoire"),
    body("email").isEmail().withMessage("Email invalide"),
    body("mot_de_passe").isLength({ min: 6 }).withMessage("Le mot de passe doit avoir au moins 6 caracteres"),
    validate,
];

export const validateUtilisateurUpdate = [
    body("nom").optional().notEmpty().withMessage("Le nom est obligatoire"),
    body("email").optional().isEmail().withMessage("Email invalide"),
    body("mot_de_passe").optional().isLength({ min: 6 }).withMessage("Le mot de passe doit avoir au moins 6 caracteres"),
    validate,
];

// Validation pour creer un patient
export const validatePatient = [
    body("date_naissance").isDate().withMessage("Date de naissance invalide"),
    body("sexe").notEmpty().withMessage("Le sexe est obligatoire"),
    body("telephone").notEmpty().withMessage("Le telephone est obligatoire"),
    body("numero_assurance_maladie").notEmpty().withMessage("Le numero d'assurance maladie est obligatoire"),
    validate,
];

export const validatePatientUpdate = [
    body("date_naissance").optional().isDate().withMessage("Date de naissance invalide"),
    body("sexe").optional().notEmpty().withMessage("Le sexe est obligatoire"),
    body("telephone").optional().notEmpty().withMessage("Le telephone est obligatoire"),
    body("numero_assurance_maladie").optional().notEmpty().withMessage("Le numero d'assurance maladie est obligatoire"),
    validate,
];

// Validation pour creer un medecin
export const validateMedecin = [
    body("numero_licence").notEmpty().withMessage("Le numero de licence est obligatoire"),
    body("telephone").notEmpty().withMessage("Le telephone est obligatoire"),
    validate,
];

export const validateMedecinUpdate = [
    body("numero_licence").optional().notEmpty().withMessage("Le numero de licence est obligatoire"),
    body("telephone").optional().notEmpty().withMessage("Le telephone est obligatoire"),
    validate,
];

export const validateRole = [
    body("nom").notEmpty().withMessage("Le nom est obligatoire"),
    validate,
];

export const validateRoleUpdate = [
    body("nom").optional().notEmpty().withMessage("Le nom est obligatoire"),
    validate,
];

export const validateDepartment = [
    body("nom").notEmpty().withMessage("Le nom du departement est obligatoire"),
    validate,
];

export const validateDepartmentUpdate = [
    body("nom").optional().notEmpty().withMessage("Le nom du departement est obligatoire"),
    validate,
];

export const validateRendezVous = [
    body("patientId").isInt({ min: 1 }).withMessage("Le patient est obligatoire"),
    body("medecinId").isInt({ min: 1 }).withMessage("Le medecin est obligatoire"),
    body("date").optional({ values: "falsy" }).isDate().withMessage("Date invalide"),
    body("heure").optional({ values: "falsy" }).matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/).withMessage("Heure invalide"),
    body("statut").optional().isIn(["en_attente", "confirme", "annule", "termine"]).withMessage("Statut invalide"),
    validate,
];

export const validateRendezVousUpdate = [
    body("patientId").optional().isInt({ min: 1 }).withMessage("Patient invalide"),
    body("medecinId").optional().isInt({ min: 1 }).withMessage("Medecin invalide"),
    body("date").optional({ values: "falsy" }).isDate().withMessage("Date invalide"),
    body("heure").optional({ values: "falsy" }).matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/).withMessage("Heure invalide"),
    body("statut").optional().isIn(["en_attente", "confirme", "annule", "termine"]).withMessage("Statut invalide"),
    validate,
];

export const validateConsultation = [
    body("description").notEmpty().withMessage("La description est obligatoire"),
    body("rendezVousId").isInt({ min: 1 }).withMessage("Le rendez-vous est obligatoire"),
    validate,
];

export const validateConsultationUpdate = [
    body("description").optional().notEmpty().withMessage("La description est obligatoire"),
    body("rendezVousId").optional().isInt({ min: 1 }).withMessage("Le rendez-vous est obligatoire"),
    validate,
];

export const validateJournalAcces = [
    body("action").notEmpty().withMessage("L'action est obligatoire"),
    body("utilisateurId").isInt({ min: 1 }).withMessage("L'utilisateur est obligatoire"),
    body("patientId").isInt({ min: 1 }).withMessage("Le patient est obligatoire"),
    validate,
];
