import { Model } from "mongoose";
import { AllSchemas } from "./models";

export interface IUser extends AllSchemas {
    email: string;
    password: string;
}

export interface IUserMethods {
    /**
     * Hashes the user's password using bcrypt's hashSync function
     */
    hashPassword: () => void;

    /**
     * Compares the input password with the current password to
     * validate or invalidate it
     * @param password The input password to compare
     */
    validatePassword: (password: string) => boolean;
}

export interface IUserModel extends Model<IUser, object, IUserMethods> {}
