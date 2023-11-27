import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../libs/jwt";

/**
 * Authenticates incoming api requests against the session
 * or the authorization bearer token
 */
export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Check if the user is logged in via session
    if (req.session?.user) {
        return next();
    }

    // If not logged in, check for Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Authentication required" });
    }

    try {
        const decoded = verifyToken(token);
        req.user = {
            sub: decoded?.sub?.toString() || "",
        };

        if (!req.user.sub) {
            return res.status(401).json({ error: "invalid jwt payload" });
        }

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            res.status(401).json({
                error: "Token expired",
                shouldRefresh: true,
            });
        } else {
            res.status(403).json({ error: "Invalid token" });
        }
    }
};
