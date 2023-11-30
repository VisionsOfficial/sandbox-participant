import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import {
    createTodo,
    deleteTodoById,
    getUserTodos,
    updateTodoById,
} from "../../../controllers/private/v1/todos.private.controller";
import { validate } from "../../middlewares/validator.middleware";
import { body, param } from "express-validator";

const r: Router = Router();

r.use(authenticate);

r.get("/me", getUserTodos);
r.post(
    "/:todoId",
    [body("name").exists().isString().trim().notEmpty()],
    validate,
    createTodo
);
r.put(
    "/:todoId",
    [
        body("name").optional().isString().trim().notEmpty(),
        body("completed").optional().isBoolean(),
    ],
    validate,
    updateTodoById
);
r.delete("/:todoId", [param("todoId").isMongoId()], validate, deleteTodoById);

export default r;
