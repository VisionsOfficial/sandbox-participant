import { Model } from "mongoose";
import { AllSchemas } from "./models";

export interface ITodo extends AllSchemas {
    name: string;
    completed: boolean;
    user: string;
}

export interface ITodoMethods {}

export interface ITodoModel extends Model<ITodo, object, ITodoMethods> {}
