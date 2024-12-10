import { NextFunction, Request, Response } from "express";
import { Logger } from "../../../libs/loggers";
import { User } from "../../../models";
import { generateSessionToken } from "../../../libs/jwt";

/**
 * Logs out the user
 */
export const logout = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        req.session.destroy((err) => {
            if (err)
                Logger.error({ location: "logout", message: err?.message });
        });

        return res.status(200).json({ message: "Successfully logged out" });
    } catch (err) {
        next(err);
    }
};

/**
 * Refreshes user session
 */
export const refreshUserSession = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findById(req.session.user._id);

        const sessionToken = generateSessionToken(user.id).token;

        req.session.user = {
            _id: user.id,
            token: sessionToken,
        };

        req.session.save();

        return res.status(200).json({
            message: "Session refreshed",
            data: {
                user: { ...user.toObject(), password: undefined },
                token: sessionToken,
            },
        });
    } catch (err) {
        next(err);
    }
};
