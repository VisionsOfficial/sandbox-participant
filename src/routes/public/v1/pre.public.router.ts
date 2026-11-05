import { Router, NextFunction, Request, Response } from "express";
import { Logger } from "../../../libs/loggers";

const r: Router = Router();

/**
 * @openapi
 * /pre:
 *   get:
 *     tags: [Mock data]
 *     summary: Get pre-processing parameters
 *     responses:
 *       200:
 *         description: Static parameters and categories
 *         content:
 *           application/json:
 *             example:
 *               params:
 *                 params1: something
 *               data:
 *                 category: [categoryA, categoryB, categoryC, categoryD]
 */
r.get("/", (req: Request, res: Response, next: NextFunction) => {
    const body = {
        params: {
            params1: "something",
        },
        data: {
            category: ["categoryA", "categoryB", "categoryC", "categoryD"],
        },
    };
    Logger.info({
        message: `infrastructureProcessing sending Body: ${JSON.stringify(
            body,
            null,
            2
        )}`,
    });
    return res.json(body);
});

export default r;
