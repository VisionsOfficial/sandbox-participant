import { NextFunction, Request, Response } from "express";
import { User } from "../../../models";
import { Logger } from "../../../libs/loggers";
import { formatTimestamp } from "../../../functions/date.functions";
import { mongooseModelQueries } from "../../../libs/mongoose";
import { AppCache } from "../../../libs/cache";

/**
 * Gets all users
 */
export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (AppCache.has("users")) {
            Logger.debug(
                `users cache will expire at: ${formatTimestamp(
                    AppCache.getTtl("users")
                )}`
            );
            return res.json(AppCache.get("users"));
        }

        const users = await User.find()
            .select(mongooseModelQueries.User.publicSelect)
            .lean();

        AppCache.set("users", users);

        return res.json(users);
    } catch (err) {
        next(err);
    }
};

/**
 * Gets all users
 */
export const createUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = [];

        for (const user of req.body) {
            const u = await User.create(user);
            users.push(u);
        }

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
