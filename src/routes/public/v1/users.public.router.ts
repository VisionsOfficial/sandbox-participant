import { Router } from "express";
import { param } from "express-validator";
import { validate } from "../../middlewares/validator.middleware";
import { queryUserById } from "../../middlewares/queries/userQueries.middleware";
import {
    createUsers,
    getAllUsers,
    getUserById,
} from "../../../controllers/public/v1/users.public.controller";
import { passthroughMe } from "../../middlewares/passthrough.middleware";

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

export default r;
