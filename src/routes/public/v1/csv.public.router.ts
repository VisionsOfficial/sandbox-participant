import { Router } from "express";
import { json2csv } from 'json-2-csv';
import {upload} from "../../../config/multer";
import fs from "fs";
import {Logger} from "../../../libs/loggers";

const r: Router = Router();

r.get('/', async (req, res) => {
    try {
        // Récupérer la taille souhaitée (ex: "10KB", "5MB", "1GB")
        const targetSizeStr = (req.query.size as string)?.toUpperCase() || "1KB";
        if (!targetSizeStr.match(/^\d+[KMGT]?B?$/i)) {
            return res.status(400).json({ error: "Format invalide. Utilisez un format comme '10KB', '5MB', '1GB'." });
        }

        // Extraire la valeur numérique et l'unité (KB, MB, GB)
        const sizeMatch = targetSizeStr.match(/^(\d+)([KMGT]?)B?$/i);
        const sizeValue = parseInt(sizeMatch[1]);
        const sizeUnit = sizeMatch[2].toUpperCase();

        // Convertir en octets
        let targetBytes;
        switch (sizeUnit) {
            case 'K': targetBytes = sizeValue * 1024; break;       // Ko → octets
            case 'M': targetBytes = sizeValue * 1024 * 1024; break; // Mo → octets
            case 'G': targetBytes = sizeValue * 1024 * 1024 * 1024; break; // Go → octets
            case 'T': targetBytes = sizeValue * 1024 * 1024 * 1024 * 1024; break; // To → octets
            default: targetBytes = sizeValue; break; // Octets (si aucune unité)
        }

        if (targetBytes <= 0) {
            return res.status(400).json({ error: "La taille doit être positive." });
        }

        // Générer une ligne test pour estimer sa taille
        const sampleData = { id: 1, nom: "Test", email: "test@example.com", date: new Date().toISOString() };
        const sampleCsvLine = json2csv([sampleData]);
        const avgLineSize = Buffer.byteLength(sampleCsvLine, 'utf8');

        // Calculer le nombre de lignes nécessaires
        let estimatedLines = Math.floor(targetBytes / avgLineSize);
        if (estimatedLines < 1) estimatedLines = 1; // Au moins 1 ligne

        // Générer les données
        const data = [];
        for (let i = 1; i <= estimatedLines; i++) {
            data.push({
                id: i,
                nom: `Utilisateur ${i}`,
                email: `user${i}@example.com`,
                date: new Date().toISOString()
            });
        }

        // Générer le CSV final
        const csv = json2csv(data);
        const actualSize = Buffer.byteLength(csv, 'utf8');

        // Si la taille est insuffisante, ajouter des lignes vides pour atteindre la cible
        if (actualSize < targetBytes) {
            const remainingBytes = targetBytes - actualSize;
            const paddingLines = Math.ceil(remainingBytes / avgLineSize);
            for (let i = 0; i < paddingLines; i++) {
                data.push({ id: '', nom: '', email: '', date: '' });
            }
            const finalCsv = json2csv(data);
            res.header('Content-Type', 'text/csv');
            res.attachment(`données_${targetSizeStr}.csv`);
            return res.send(finalCsv);
        }

        // Envoyer le CSV
        res.header('Content-Type', 'text/csv');
        res.attachment(`données_${targetSizeStr}.csv`);
        res.send(csv);

    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({ error: "Erreur serveur." });
    }
});

r.post('/', upload.single('file'), async (req, res) => {
    const { responseType } = req.query;

    if(responseType === 'csv') {
        fs.readFile(req.file.path, (err, data) => {
            if (err) return res.status(500).send("Erreur lors de la lecture du fichier.");
            res.header('Content-Type', req.file.mimetype);
            res.send(data);
        });
    } else if(responseType === 'json') {
        Logger.log({ message: `Conversion du fichier CSV en JSON pour le fichier : ${(JSON.stringify(req.body, null, 2))}` });
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
