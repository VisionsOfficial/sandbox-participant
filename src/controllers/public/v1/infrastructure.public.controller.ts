import { NextFunction, Request, Response } from "express";
import { Logger } from "../../../libs/loggers";

/**
 * Add score on users
 */
export const infrastructureProcessing = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body;
        Logger.info({
            message: `infrastructureProcessing received Body: ${JSON.stringify(
                body,
                null,
                2
            )}`,
        });
        if (!body.data) {
            if (typeof body !== "object") {
                for (const user of body) {
                    user.score = Math.floor(Math.random() * 100);
                }
            } else {
                body.score = Math.floor(Math.random() * 100);
            }
        } else {
            if (typeof body !== "object") {
                for (const user of body.data) {
                    user.score = Math.floor(Math.random() * 100);
                }
            } else {
                body.data.score = Math.floor(Math.random() * 100);
            }
        }
        Logger.info({
            message: `infrastructureProcessing received Body: ${JSON.stringify(
                body,
                null,
                2
            )}`,
        });

        return res.status(200).json(!body.data ? body : body.data);
    } catch (err) {
        next(err);
    }
};
