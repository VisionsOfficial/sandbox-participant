import { Schema } from "mongoose";
import { ITodo, ITodoModel, ITodoMethods } from "../../types/todo";

export const todoSchema = new Schema<ITodo, ITodoModel, ITodoMethods>(
    {
        name: { type: String, required: true },
        completed: { type: Boolean, default: false },
        user: { type: String, required: true },
        schema_version: { type: String, default: "1" },
    },
    {
        timestamps: true,
        query: {},
    }
);
