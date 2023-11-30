import { Router } from "express";
import { param } from "express-validator";
import { validate } from "../../middlewares/validator.middleware";
import {
    getAllTodos,
    getTodoById,
} from "../../../controllers/public/v1/todos.public.controller";
import { passthroughMe } from "../../middlewares/passthrough.middleware";

const r: Router = Router();

r.get("/", getAllTodos);
r.get(
    "/:todoId",
    passthroughMe,
    [param("todoId").isMongoId()],
    validate,
    getTodoById
);

export default r;
