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
            case 'K': targetBytes = sizeValue * 1024; break;
            case 'M': targetBytes = sizeValue * 1024 * 1024; break;
            case 'G': targetBytes = sizeValue * 1024 * 1024 * 1024; break;
            case 'T': targetBytes = sizeValue * 1024 * 1024 * 1024 * 1024; break;
            default: targetBytes = sizeValue; break;
        }

        if (targetBytes <= 0) {
            return res.status(400).json({ error: "La taille doit être positive." });
        }

        // Générer une ligne test pour estimer sa taille
        const sampleData = { id: 1, nom: "Test", email: "test@example.com", date: new Date().toISOString() };
        const sampleSqlLine = `(${sampleData.id}, '${sampleData.nom}', '${sampleData.email}', '${sampleData.date}')`;
        const avgLineSize = Buffer.byteLength(sampleSqlLine, 'utf8');

        // Calculer le nombre de lignes nécessaires
        let estimatedLines = Math.floor(targetBytes / avgLineSize);
        if (estimatedLines < 1) estimatedLines = 1;

        // Générer les données
        const values: string[] = [];
        for (let i = 1; i <= estimatedLines; i++) {
            const nom = `User ${i}`;
            const email = `user${i}@example.com`;
            const date = new Date().toISOString();
            values.push(`(${i}, '${nom}', '${email}', '${date}')`);
        }

        // Générer la requête SQL
        const createTable = `
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                nom VARCHAR(255),
                email VARCHAR(255),
                date TIMESTAMP
            );
        `.trim();

        const insertInto = `
INSERT INTO users (id, nom, email, date) VALUES
${values.join(",\n")};
        `.trim();

        const sqlQuery = `${createTable}\n\n${insertInto}`;

        res.header('Content-Type', 'text/plain; charset=utf-8');
        res.send(sqlQuery);

    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({ error: "Erreur serveur." });
    }
});

export default r;
