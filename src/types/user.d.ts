import { Model } from "mongoose";
import { AllSchemas } from "./models";

/**
 * The OAuth2 V2 Schema$UserInfo returned from Google
 */
type GoogleOAuthProviderSchema = {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
};

export interface IUser extends AllSchemas {
    email: string;
    password: string;
    verified_email: boolean;

    /**
     * OAuth2.0 User information when using external providers such
     * as Google / Facebook ...
     */
    oauth: {
        /**
         * User information provided by Google when using OAuth2.0
         */
        google: GoogleOAuthProviderSchema;
    };
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

    /**
     * Checks to see if the user has verified his email
     *
     * If the user used a provider login such as google
     * for now we consider that it is verified.
     *
     * To be noted that for example Google provides an
     * "email_verified" key that can be used to verify
     * if the email has been verified on the google account
     * allowing for authorization granularity. This is not
     * currently implemented but can easily be added.
     */
    isEmailVerified: () => boolean;
}

export interface IUserModel extends Model<IUser, object, IUserMethods> {}
