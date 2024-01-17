import { Schema } from "mongoose";
import { IUser, IUserMethods, IUserModel } from "../../types/user";

export const userSchema = new Schema<IUser, IUserModel, IUserMethods>(
    {
        email: { type: String, required: true },
        password: { type: String },
        verified_email: { type: Boolean, default: false },
        oauth: {
            google: {
                id: { type: String, default: "" },
                email: { type: String, default: "" },
                verified_email: { type: Boolean, default: false },
                name: { type: String, default: "" },
                given_name: { type: String, default: "" },
                family_name: { type: String, default: "" },
                picture: { type: String, default: "" },
                locale: { type: String, default: "" },
            },
        },
        schema_version: { type: String, default: "1" },
    },
    {
        timestamps: true,
        query: {},
    }
);
