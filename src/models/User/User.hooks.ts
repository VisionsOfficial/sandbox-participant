import { CallbackWithoutResultAndOptionalError, Schema } from "mongoose";

import bcrypt from "bcryptjs";
import { IUser, IUserMethods, IUserModel } from "../../types/user";

export const hooks = (schema: Schema<IUser, IUserModel, IUserMethods>) => {
    schema.pre("save", function (next: CallbackWithoutResultAndOptionalError) {
        if (this.isModified("password")) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(this.password, salt, (err, hash) => {
                    this.password = hash;
                    return next();
                });
            });
        } else {
            next();
        }
    });
};
