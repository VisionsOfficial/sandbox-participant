import session from "express-session";
import MongoStore from "connect-mongo";
import crypto from "crypto";
import { config } from "./environment";
import { RequestHandler } from "express";

/**
 * Initializes the session with the mongo store
 * @returns The session object
 */
export const setupSession = (): RequestHandler => {
    return session({
        genid: () => {
            return crypto.randomUUID();
        },
        secret: config.sessionSecret,
        resave: true, // Verify this setting (getting errors with touch method on cold start)
        saveUninitialized: false,
        name: config.sessionCookieName,
        cookie: {
            sameSite: config.env === "production" ? "none" : "lax",
            // httpOnly: true,
            secure: config.env === "production",
            maxAge: config.sessionCookieDuration,
        },
        store: MongoStore.create({ mongoUrl: config.mongoURI }),
    });
};
