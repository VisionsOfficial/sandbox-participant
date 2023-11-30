import { NextFunction, Request, Response } from "express";

/**
 * Logs out the user
 * @author Felix Bole
 */
export const logout = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        req.session.destroy(() => {
            return res.status(200).json({ message: "Successfully logged out" });
        });

        return res.status(400).json({ error: "failed to log out" });
    } catch (err) {
        next(err);
    }
};
