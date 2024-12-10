import "express-session";

declare module "express-session" {
    interface SessionData {
        user?: { _id: string; token: string };
    }
}
