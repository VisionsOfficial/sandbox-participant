import { NextFunction, Request, Response } from "express";
import { publicUserSelect } from "../../../libs/mongoose/users.mongoose";
import { User } from "../../../models";

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
            .select(publicUserSelect)
            .lean();
        if (!user) return res.status(404).json({ error: "User not found" });
        return user;
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
            .select(publicUserSelect)
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
            publicUserSelect
        );
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.json(user);
    } catch (err) {
        next(err);
    }
};
