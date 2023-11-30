import { Schema } from "mongoose";
import { ITodo, ITodoModel, ITodoMethods } from "../../types/todo";

export const virtuals = (schema: Schema<ITodo, ITodoModel, ITodoMethods>) => {
    // schema.virtual("population", {
    //     ref: "Target",
    //     localField: "_id",
    //     foreignField: "population",
    // });
};
