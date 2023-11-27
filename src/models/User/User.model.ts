import { Schema } from "mongoose";
import { IUser, IUserMethods, IUserModel } from "../../types/models/user";

export const userSchema = new Schema<IUser, IUserModel, IUserMethods>(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        schema_version: { type: String, default: "1" },
    },
    {
        timestamps: true,
        query: {},
    }
);
