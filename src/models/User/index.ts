import mongoose from "mongoose";
import { userSchema } from "./User.model";
import { statics } from "./User.statics";
import { methods } from "./User.methods";
import { hooks } from "./User.hooks";
import { virtuals } from "./User.virtuals";
import { IUser, IUserModel } from "../../types/user";

statics(userSchema);
methods(userSchema);
hooks(userSchema);
virtuals(userSchema);

/**
 * User
 */
export const User = mongoose.model<IUser, IUserModel>("User", userSchema);
