import { Router } from "express";
import { body } from "express-validator";
import {
    isNonEmptyEmail,
    validate,
} from "../../middlewares/validator.middleware";
import {
    login,
    signup,
} from "../../../controllers/public/v1/auth.public.controller";

const r: Router = Router();

r.post(
    "/login",
    [
        isNonEmptyEmail,
        body(
            "password",
            "Password is not strong enough and should include at least one uppercase, one lowercase, one number, one special character and have more than 8 characters"
        ).isStrongPassword(),
    ],
    validate,
    login
);

r.post(
    "/signup",
    [
        isNonEmptyEmail,
        body(
            "password",
            "Password is not strong enough and should include at least one uppercase, one lowercase, one number, one special character and have more than 8 characters"
        ).isStrongPassword(),
    ],
    validate,
    signup
);

export default r;
