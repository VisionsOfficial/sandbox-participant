import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const isNonEmptyEmail = () => {
    return body("email", "Invalid or missing email")
        .isEmail()
        .notEmpty()
        .trim();
};

export const isValidPassword = () => {
    return body("password", "Invalid or missing password")
        .isStrongPassword({
            minLength: 8,
            minNumbers: 1,
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
        })
        .trim();
};

/**
 * Checks the validation pipeline of express-validator
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).jsonp(errors.array());
    } else {
        next();
    }
};
