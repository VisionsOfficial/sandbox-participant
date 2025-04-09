import { Schema } from "mongoose";

import bcrypt from "bcryptjs";
import { IUser, IUserMethods, IUserModel } from "../../types/user";

export const methods = (schema: Schema<IUser, IUserModel, IUserMethods>) => {
    schema.methods.hashPassword = function () {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    };

    schema.methods.validatePassword = function (password: string) {
        return bcrypt.compareSync(password, this.password);
    };

    schema.methods.isEmailVerified = function () {
        // If user has signed in with google, let's say that its validated
        return this.verified_email;
    };
};
