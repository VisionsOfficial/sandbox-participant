import { Schema } from "mongoose";
import { IUser, IUserMethods, IUserModel } from "../../types/user";

// @ts-ignore
export const virtuals = (schema: Schema<IUser, IUserModel, IUserMethods>) => {
    // schema.virtual("population", {
    //     ref: "Target",
    //     localField: "_id",
    //     foreignField: "population",
    // });
};
