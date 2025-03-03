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
                body.map(
                    (element: { score: number }) =>
                        (element.score = Math.floor(Math.random() * 100))
                );
            } else {
                body.score = Math.floor(Math.random() * 100);
            }
        } else {
            if (body.data[0]._id) {
                body.data.map(
                    (element: { score: number }) =>
                        (element.score = Math.floor(Math.random() * 100))
                );
            } else {
                body.data.score = Math.floor(Math.random() * 100);
            }
        }
        Logger.info({
            message: `infrastructureProcessing sending Body: ${JSON.stringify(
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
