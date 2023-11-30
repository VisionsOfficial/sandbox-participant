import { NextFunction, Request, Response } from "express";
import { Todo } from "../../../models";

/**
 * Gets the todos from user in session
 */
export const getUserTodos = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const todos = await Todo.find({ user: req.session.user._id }).lean();
        return res.json(todos);
    } catch (err) {
        next(err);
    }
};

/**
 * Creates a new Todo
 */
export const createTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const todo = new Todo({ ...req.body, user: req.session.user._id });
        await todo.save();
        return res.status(201).json(todo);
    } catch (err) {
        next(err);
    }
};

/**
 * Updates a todo by ID
 */
export const updateTodoById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.todoId,
            { ...req.body },
            { new: true, runValidators: true }
        ).lean();

        return res.json(todo);
    } catch (err) {
        next(err);
    }
};

/**
 * Deletes a todo by ID
 */
export const deleteTodoById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.todoId);

        if (!todo) return res.status(404).json({ error: "Todo not found" });
        return res.json(todo);
    } catch (err) {
        next(err);
    }
};
