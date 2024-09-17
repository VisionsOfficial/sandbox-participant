import { Schema } from "mongoose";

import bcrypt from "bcrypt";
import { IUser, IUserMethods, IUserModel } from "../../types/user";

export const methods = (schema: Schema<IUser, IUserModel, IUserMethods>) => {
    schema.methods.hashPassword = function () {
        // @ts-ignore
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    };

    schema.methods.validatePassword = function (password: string) {
        // @ts-ignore
        return bcrypt.compareSync(password, this.password);
    };

    schema.methods.isEmailVerified = function () {
        // If user has signed in with google, let's say that its validated
        if (this.oauth?.google?.email) return true;
        return this.verified_email;
    };
};
