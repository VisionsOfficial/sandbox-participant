import multer from "multer";
import path from "path";
import { config } from "./environment";

const MIME_TYPES: { [key: string]: string } = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "text/csv": "csv",
    "application/pdf": "pdf",
    "application/octet-stream": "bin",
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "..", "..", config.uploadsPath));
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(" ").join("_");
        const nameNoExtension = name.split(".")[0];
        if (!MIME_TYPES[file.mimetype]) {
            cb(new Error("invalid extension"), "");
        }
        const extension = MIME_TYPES[file.mimetype];
        cb(null, nameNoExtension + Date.now() + "." + extension);
    },
});

export const upload = multer({
    storage: storage,
});
