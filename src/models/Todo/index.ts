import mongoose from "mongoose";
import { ITodo, ITodoModel } from "../../types/todo";
import { todoSchema } from "./Todo.model";
import { statics } from "./Todo.statics";
import { methods } from "./Todo.methods";
import { hooks } from "./Todo.hooks";
import { virtuals } from "./Todo.virtuals";

statics(todoSchema);
methods(todoSchema);
hooks(todoSchema);
virtuals(todoSchema);

/**
 * Todo
 */
export const Todo = mongoose.model<ITodo, ITodoModel>("Todo", todoSchema);
