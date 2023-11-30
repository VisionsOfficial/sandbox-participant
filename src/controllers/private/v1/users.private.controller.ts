import { NextFunction, Request, Response } from "express";
import { User } from "../../../models";
import { mongooseModelQueries } from "../../../libs/mongoose";

/**
 * Gets the user in session
 */
export const getCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findById(req.session.user._id)
            .select(mongooseModelQueries.User.publicSelect)
            .lean();
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.status(200).json({
            user: { ...user, password: undefined },
            token: req.session.user.token,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Updates a user by ID
 */
export const updateUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { ...req.body },
            { new: true, runValidators: true }
        )
            .select(mongooseModelQueries.User.publicSelect)
            .lean();

        return res.json(user);
    } catch (err) {
        next(err);
    }
};

/**
 * Deletes a user by ID
 */
export const deleteUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId).select(
            mongooseModelQueries.User.publicSelect
        );
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.json(user);
    } catch (err) {
        next(err);
    }
};
