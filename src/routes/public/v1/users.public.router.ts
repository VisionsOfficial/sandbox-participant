import { Router } from "express";
import { body, param } from "express-validator";
import { validate } from "../../middlewares/validator.middleware";
import { queryUserById } from "../../middlewares/queries/userQueries.middleware";
import {
    createUser,
    createUsers,
    getAllUsers,
    getUserById,
} from "../../../controllers/public/v1/users.public.controller";
import { passthroughMe } from "../../middlewares/passthrough.middleware";
import {
    deleteUserById,
    updateUserById,
} from "../../../controllers/private/v1/users.private.controller";

const r: Router = Router();

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

r.put(
    "/:userId",
    [body("email").optional().isEmail(), body("skills").optional()],
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

r.post("/register", createUser);

export default r;
