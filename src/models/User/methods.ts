import { Schema } from "mongoose";

import bcrypt from "bcrypt";
import { IUser, IUserMethods, IUserModel } from "../../types/models/user";

export const methods = (schema: Schema<IUser, IUserModel, IUserMethods>) => {
    schema.methods.hashPassword = function () {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    };

    schema.methods.validatePassword = function (password: string) {
        return bcrypt.compareSync(password, this.password);
    };
};
