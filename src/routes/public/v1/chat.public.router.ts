import { Router, NextFunction, Request, Response } from "express";
import axios from "axios";

const r: Router = Router();

/**
 * @openapi
 * /chat:
 *   post:
 *     tags: [Chat]
 *     summary: Send a message to the chat service
 *     description: Forwards the message to the external chat service and returns its response as is.
 *     parameters:
 *       - name: type
 *         in: query
 *         schema:
 *           type: string
 *       - name: user
 *         in: query
 *         schema:
 *           type: string
 *       - name: system
 *         in: query
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *           example:
 *             message: Hello
 *     responses:
 *       200:
 *         description: Response of the chat service
 *         content:
 *           application/json:
 *             schema: {}
 */
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
