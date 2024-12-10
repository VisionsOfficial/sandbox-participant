import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import {
    deleteUserById,
    getCurrentUser,
    updateUserById,
} from "../../../controllers/private/v1/users.private.controller";
import { validate } from "../../middlewares/validator.middleware";
import { queryUserById } from "../../middlewares/queries/userQueries.middleware";
import { body, param } from "express-validator";
import {
    createUsers,
    getAllUsers,
    getUserById,
} from "../../../controllers/public/v1/users.public.controller";
import { passthroughMe } from "../../middlewares/passthrough.middleware";

const r: Router = Router();

r.use(authenticate);

r.get("/", getAllUsers);
r.post("/", createUsers);
r.get(
    "/:userId",
    passthroughMe,
    [param("userId").isMongoId()],
    validate,
    queryUserById,
    getUserById
);
r.get("/me", getCurrentUser);
r.put(
    "/:userId",
    [body("email").optional().isEmail()],
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
