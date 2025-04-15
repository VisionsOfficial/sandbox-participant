import { NextFunction, Request, Response } from "express";
import { Logger } from '../../../libs/loggers';

/**
 * Consumer the data
 */
export const consume = async (
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
        return res.json({
            message: "Received Data.",
            dataReceived: body,
        });
    } catch (err) {
        next(err);
    }
};
