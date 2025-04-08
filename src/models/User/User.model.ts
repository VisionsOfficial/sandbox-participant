import { Schema } from "mongoose";
import { IUser, IUserMethods, IUserModel } from "../../types/user";

export const userSchema = new Schema<IUser, IUserModel, IUserMethods>(
    {
        email: { type: String, required: true },
        password: { type: String },
        verified_email: { type: Boolean, default: false },
        skills: [{ type: String }],
        schema_version: { type: String, default: "1" },
    },
    {
        timestamps: true,
        query: {},
    }
);
