import { Router, NextFunction, Request, Response } from "express";
import axios from "axios";

const r: Router = Router();

r.post("/", async (req: Request, res: Response, next: NextFunction) => {
    const request = await axios.post(
        "http://51.15.206.152:3501/v1/chat?type=report&user=0&system=0",
        {
            message: req.body.message,
        }
    );
    return res.json(request.data);
});

export default r;
