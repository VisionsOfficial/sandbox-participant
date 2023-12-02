import { Router } from "express";
import { body } from "express-validator";
import { validate } from "../../middlewares/validator.middleware";
import {
    login,
    register,
} from "../../../controllers/public/v1/auth.public.controller";

const r: Router = Router();

r.post(
    "/login",
    [
        body("email", "Invalid or missing email").isEmail().notEmpty().trim(),
        body("password").isString().notEmpty().trim(),
    ],
    validate,
    login
);

r.post(
    "/register",
    [
        body("email", "Invalid or missing email").isEmail().notEmpty().trim(),
        body(
            "password",
            "Password is not strong enough and should include at least one uppercase, one lowercase, one number, one special character and have more than 8 characters"
        ).isStrongPassword(),
    ],
    validate,
    register
);

export default r;
