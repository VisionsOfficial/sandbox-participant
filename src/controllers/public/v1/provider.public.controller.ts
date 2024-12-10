import { NextFunction, Request, Response } from "express";

/**
 * Consumer the data
 */
export const provide = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        return res.json({
            message: "There is sample data.",
        });
    } catch (err) {
        next(err);
    }
};
