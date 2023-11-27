import mongoose from "mongoose";
import { userSchema } from "./User.model";
import { statics } from "./statics";
import { methods } from "./methods";
import { hooks } from "./hooks";
import { virtuals } from "./virtuals";
import { IUser, IUserModel } from "../../types/models/user";

statics(userSchema);
methods(userSchema);
hooks(userSchema);
virtuals(userSchema);

/**
 * User
 */
export const User = mongoose.model<IUser, IUserModel>("User", userSchema);
