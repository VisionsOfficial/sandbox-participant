import { NextFunction, Request, Response } from "express";
import { google } from "googleapis";
import { User } from "../../../models";
import { generateSessionToken } from "../../../libs/jwt";
import { GoogleOAuthClient } from "../../../libs/auth/google";
import { Logger } from "../../../libs/loggers";
import { config } from "../../../config/environment";
import { randomBytes } from "crypto";

/**
 * Initializes the user's session
 */
const initializeSession = (req: Request, userId: string) => {
    const sessionToken = generateSessionToken(userId).token;

    req.session.user = {
        _id: userId,
        token: sessionToken,
    };

    req.session.save();

    return { sessionToken };
};

/**
 * Signs up the user
 */
export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body as {
            email: string;
            password: string;
        };

        const existing = await User.findOne({ email });

        if (existing)
            return res.status(409).json({ error: "email already exists" });

        const user = new User({ email, password });
        await user.save();

        const { sessionToken } = initializeSession(req, user.id);

        return res.status(200).json({
            message: "Successfully registered user & initialized session",
            data: {
                user: { ...user.toObject(), password: undefined },
                token: sessionToken,
            },
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Logs the user
 */
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body as {
            email: string;
            password: string;
        };

        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: "User not found" });

        if (!user.validatePassword(password))
            return res.status(400).json({ error: "Invalid credentials" });

        const { sessionToken } = initializeSession(req, user.id);

        return res.status(200).json({
            message: "Successfully logged user in",
            data: {
                user: { ...user.toObject(), password: undefined },
                token: sessionToken,
            },
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Returns the google Auth URL
 */
export const getGoogleAuthURL = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authURL = GoogleOAuthClient.generateAuthUrl({
            access_type: "offline",
            scope: [
                "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/userinfo.profile",
            ],
        });
        res.redirect(authURL);
    } catch (err) {
        next(err);
    }
};

/**
 * Handles the google OAuth callback
 */
export const handleGoogleAuthCallback = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { code } = req.query as { code?: string };
    try {
        const { tokens } = await GoogleOAuthClient.getToken(code);
        GoogleOAuthClient.setCredentials(tokens);

        const oauth2 = google.oauth2("v2");

        try {
            const response = await oauth2.userinfo.get({
                auth: GoogleOAuthClient as any,
            });

            const { data } = response;
            if (!data || Object.keys(data).length === 0)
                throw new Error("No user data returned from Google");

            const user = await User.findOne({
                $or: [
                    { "oauth.google.email": data.email },
                    { emai: data.email },
                ],
            });

            if (!user) {
                // Create user
                const newUser = new User({
                    email: data.email,
                    password: randomBytes(16).toString(), // Random password to avoid setting null for security reasons
                    oauth: {
                        google: {
                            ...data,
                        },
                    },
                });

                await newUser.save();
                initializeSession(req, newUser.id).sessionToken;
            } else {
                // Re-configure the oauth data in the user's profile information
                // because the user might've had modified his data on google

                await user.save();
                initializeSession(req, user.id).sessionToken;
            }

            res.redirect(`${config.clientAppURL}/`);
        } catch (err) {
            Logger.error({
                location: "handleGoogleAuthCallback",
                message: "Failed to get userinfo: " + err?.message,
            });
            res.redirect(
                config.env === "development" ? config.clientAppURL : "/"
            );
        }
    } catch (err) {
        next(err);
    }
};
