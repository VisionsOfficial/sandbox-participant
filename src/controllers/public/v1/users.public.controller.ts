import { NextFunction, Request, Response } from "express";
import { User } from "../../../models";

/**
 * Gets all users
 */
export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await User.find().lean();
        return res.json(users);
    } catch (err) {
        next(err);
    }
};

/**
 * Gets a user by ID
 */
export const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        return res.json(req.queriedUser.toObject());
    } catch (err) {
        next(err);
    }
};
