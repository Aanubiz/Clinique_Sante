import multer from "multer";

// Dossier ou les photos seront enregistrees
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

