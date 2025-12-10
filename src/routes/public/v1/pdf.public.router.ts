import { Router } from "express";
import { upload } from "../../../config/multer";
import fs from "fs";
import PDFDocument from 'pdfkit';

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

        const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.";
        let blocks = 20;
        let pdfSize = 0;
        let iteration = 0;
        const maxIterations = 3;

        // Ajustement dynamique
        while (iteration < maxIterations) {
            const testDoc = new PDFDocument();
            let testBuffers: Buffer[] = [];
            testDoc.on('data', testBuffers.push.bind(testBuffers));
            testDoc.fontSize(16).text('Document Lorem Ipsum', { align: 'center' });
            testDoc.moveDown();
            for (let i = 0; i < blocks; i++) {
                testDoc.fontSize(12).text(lorem, { align: 'left' });
                testDoc.moveDown();
            }
            testDoc.end();
            await new Promise(resolve => testDoc.on('end', resolve));
            pdfSize = Buffer.concat(testBuffers).length;

            if (Math.abs(pdfSize - targetBytes) < targetBytes * 0.05) break; // 5% de marge
            blocks = Math.max(1, Math.floor(blocks * targetBytes / pdfSize));
            iteration++;
        }

        // Génération du PDF final
        const doc = new PDFDocument();
        let buffers: Buffer[] = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            res.header('Content-Type', 'application/pdf');
            res.attachment(`lorem_${targetSizeStr}.pdf`);
            res.send(pdfData);
        });

        doc.fontSize(16).text('Document Lorem Ipsum', { align: 'center' });
        doc.moveDown();

        for (let i = 0; i < blocks; i++) {
            doc.fontSize(12).text(lorem, { align: 'left' });
            doc.moveDown();
        }

        doc.end();

    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({ error: "Erreur serveur." });
    }
});

r.post('/', upload.single('file'), async (req, res) => {
    const { responseType } = req.query;

    if(responseType === 'pdf') {
        fs.readFile(req.file.path, (err, data) => {
            if (err) return res.status(500).send("Erreur lors de la lecture du fichier.");
            res.header('Content-Type', 'application/pdf');
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
