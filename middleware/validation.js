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

// Validation pour creer un patient
export const validatePatient = [
    body("date_naissance").isDate().withMessage("Date de naissance invalide"),
    body("sexe").notEmpty().withMessage("Le sexe est obligatoire"),
    body("telephone").notEmpty().withMessage("Le telephone est obligatoire"),
    body("numero_assurance_maladie").notEmpty().withMessage("Le numero d'assurance maladie est obligatoire"),
    validate,
];

// Validation pour creer un medecin
export const validateMedecin = [
    body("numero_licence").notEmpty().withMessage("Le numero de licence est obligatoire"),
    body("telephone").notEmpty().withMessage("Le telephone est obligatoire"),
    validate,
];
