import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import {
    deleteUserById,
    getCurrentUser,
    updateUserById,
} from "../../../controllers/private/v1/users.private.controller";
import {
    isNonEmptyEmail,
    isValidPassword,
    validate,
} from "../../middlewares/validator.middleware";
import { queryUserById } from "../../middlewares/queries/userQueries.middleware";
import { param } from "express-validator";

const r: Router = Router();

r.use(authenticate);

r.get("/me", getCurrentUser);
r.put(
    "/:userId",
    [isNonEmptyEmail, isValidPassword],
    validate,
    queryUserById,
    updateUserById
);
r.delete(
    "/:userId",
    [param("userId").isMongoId()],
    validate,
    queryUserById,
    deleteUserById
);

export default r;
