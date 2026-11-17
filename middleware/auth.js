import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "clinique_secret";

// Verifier le token JWT
export const verifierToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token manquant" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET);
        req.utilisateur = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide" });
    }
};

export default verifierToken;
