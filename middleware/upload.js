import multer from "multer";
import fs from "fs";

// Dossier ou les photos seront enregistrees
fs.mkdirSync("uploads/", { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const nomUnique = Date.now() + "-" + file.originalname;
        cb(null, nomUnique);
    },
});

const upload = multer({ storage });

export default upload;
