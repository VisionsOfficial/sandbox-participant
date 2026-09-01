import { Router } from "express";
import { json2csv } from 'json-2-csv';
import {upload} from "../../../config/multer";
import fs from "fs";
import {Logger} from "../../../libs/loggers";

const r: Router = Router();

r.get('/', async (req, res) => {
    try {

       const skills = [
            { name: "Communication", level: "Advanced" },
            { name: "Tile management", level: "Intermediate" },
            { name: "Problem solving", level: "Advanced" },
            { name: "Teamwork", level: "Intermediate" },
            { name: "Adaptability", level: "Beginner" },
            { name: "Windows", level: "Beginner" },
            { name: "Office suite", level: "Beginner" }
        ];

        Logger.info({
            message: `users sending Body: ${JSON.stringify(skills, null, 2)}`,
        });

        return res.json(skills);

    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({ error: "Erreur serveur." });
    }
});

export default r;
