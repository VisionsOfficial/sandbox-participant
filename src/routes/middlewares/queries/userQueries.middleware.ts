import { NextFunction, Request, Response } from "express";
import { User } from "../../../models";
import { mongooseModelQueries } from "../../../libs/mongoose";

/**
 * Queries the user by ID and provides the hydrated
 * user to the request for the next handlers
 */
export const queryUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.userId || req.params.id || req.params.userID; // fail safe
        const user = await User.findById(id).select(
            mongooseModelQueries.User.publicSelect
        );
        if (!user) return res.status(404).json({ error: "User not found" });

        req.queriedUser = user;
        next();
    } catch (err) {
        next(err);
    }
};
