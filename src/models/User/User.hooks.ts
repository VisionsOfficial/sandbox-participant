import { CallbackWithoutResultAndOptionalError, Schema } from "mongoose";

import bcrypt from "bcrypt";
import { IUser, IUserMethods, IUserModel } from "../../types/user";

export const hooks = (schema: Schema<IUser, IUserModel, IUserMethods>) => {
    schema.pre("save", function (next: CallbackWithoutResultAndOptionalError) {
        if (this.isModified("password")) {
            bcrypt.genSalt(10, (_err, salt) => {
                // @ts-ignore
                return bcrypt.hash(this.password, salt, (_err, hash) => {
                    this.password = hash;
                    return next();
                });
            });
        } else {
            next();
        }
    });
};
