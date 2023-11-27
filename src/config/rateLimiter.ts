import { rateLimit } from "express-rate-limit";
import { config } from "./environment";

export const publicRateLimiter = rateLimit({
    windowMs: config.rateLimitPublicWindowMinutes * 60 * 1000,
    limit: config.rateLimitPublicLimitPerWindow,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: `Reached API Quota for this time window: ${
        config.rateLimitPublicLimitPerWindow
    } requests per ${config.rateLimitPublicWindowMinutes * 60 * 1000} minutes`,
});

export const privateRateLimiter = rateLimit({
    windowMs: config.rateLimitPrivateWindowMinutes * 60 * 1000,
    limit: config.rateLimitPrivateLimitPerWindowDefault,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: `Reached API Quota for this time window: ${
        config.rateLimitPrivateLimitPerWindowDefault
    } requests per ${config.rateLimitPrivateWindowMinutes * 60 * 1000} minutes`,
});
