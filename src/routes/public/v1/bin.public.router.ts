import { Router } from "express";
import { upload } from "../../../config/multer";
import fs from "fs";

const r: Router = Router();

r.get('/', async (req, res) => {
    try {
        const targetSizeStr = (req.query.size as string)?.toUpperCase() || "1KB";
        if (!targetSizeStr.match(/^\d+[KMGT]?B?$/i)) {
            return res.status(400).json({ error: "Format invalide. Utilisez un format comme '10KB', '5MB', '1GB'." });
        }

        const sizeMatch = targetSizeStr.match(/^(\d+)([KMGT]?)B?$/i);
        const sizeValue = parseInt(sizeMatch[1]);
        const sizeUnit = sizeMatch[2].toUpperCase();

        let targetBytes;
        switch (sizeUnit) {
            case 'K': targetBytes = sizeValue * 1024; break;
            case 'M': targetBytes = sizeValue * 1024 * 1024; break;
            case 'G': targetBytes = sizeValue * 1024 * 1024 * 1024; break;
            case 'T': targetBytes = sizeValue * 1024 * 1024 * 1024 * 1024; break;
            default: targetBytes = sizeValue; break;
        }

        if (targetBytes <= 0) {
            return res.status(400).json({ error: "La taille doit être positive." });
        }

        // Création du buffer binaire
        const buffer = Buffer.alloc(targetBytes);
        for (let i = 0; i < targetBytes; i++) {
            buffer[i] = Math.floor(Math.random() * 256); // Données aléatoires
        }

        res.header('Content-Type', 'application/octet-stream');
        res.attachment(`fichier_${targetSizeStr}.bin`);
        res.send(buffer);

    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({ error: "Erreur serveur." });
    }
});

r.post('/', upload.single('file'), async (req, res) => {
    const { responseType } = req.query;

    if(responseType === 'bin') {
        fs.readFile(req.file.path, (err, data) => {
            if (err) return res.status(500).send("Erreur lors de la lecture du fichier.");
            res.header('Content-Type', 'application/octet-stream');
            res.send(data);
        });
    } else if(responseType === 'json') {
        res.status(200).json(req.file);
    } else if(!responseType) {
        res.status(200).json({ message: "ok" });
    }

    if (req.file) {
        fs.unlink(req?.file?.path, (err: any) => {
            if (err) console.error("Erreur lors de la suppression du fichier :", err);
        });
    }
});

export default r;
