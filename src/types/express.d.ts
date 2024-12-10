import "express";
import { HydratedDocument } from "mongoose";
import { IUser } from "./user";

declare module "express" {
    interface Request {
        /**
         * Decoded bearer token payload
         */
        user?: { sub?: string };

        /**
         * Present only on routes using the user query middleware
         */
        queriedUser?: HydratedDocument<IUser>;
    }
}
