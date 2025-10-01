import { Router, NextFunction, Request, Response } from "express";
import axios from "axios";

const r: Router = Router();

r.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const { type, user, system } = req.query;

    const request = await axios.post(
        `http://51.15.206.152:3501/v1/chat?type=${type}&user=${user}&system=${system}`,
        {
            message: req.body.message,
        }
    );
    return res.json(request.data);
});

export default r;
