import { Schema } from "mongoose";
import { ITodo, ITodoModel, ITodoMethods } from "../../types/todo";

export const hooks = (schema: Schema<ITodo, ITodoModel, ITodoMethods>) => {
    // schema.pre("save", function (next: any) {
    //     next();
    // })
};
