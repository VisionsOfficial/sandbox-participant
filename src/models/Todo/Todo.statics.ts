import { Schema } from "mongoose";
import { ITodo, ITodoMethods, ITodoModel } from "../../types/todo";

export const statics = (schema: Schema<ITodo, ITodoModel, ITodoMethods>) => {
    // schema.statics.template = async function () {
    //     return true;
    // };
};
