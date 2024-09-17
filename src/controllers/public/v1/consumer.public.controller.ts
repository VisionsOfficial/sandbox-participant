import { NextFunction, Request, Response } from "express";

/**
 * Consumer the data
 */
export const consume = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        return res.json({
            message: "Your data have been consumed.",
            dataReceived: req.body,
        });
    } catch (err) {
        next(err);
    }
};
