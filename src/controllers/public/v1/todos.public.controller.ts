import { NextFunction, Request, Response } from "express";
import { Todo } from "../../../models";

/**
 * Gets all todos
 */
export const getAllTodos = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const todos = await Todo.find().lean();
        return res.json(todos);
    } catch (err) {
        next(err);
    }
};

/**
 * Gets a todo by ID
 */
export const getTodoById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const todo = await Todo.findById(req.params.todoId);

        if (!todo) {
            return res.status(404).json({ error: "Not found" });
        }

        return res.json(todo);
    } catch (err) {
        next(err);
    }
};
