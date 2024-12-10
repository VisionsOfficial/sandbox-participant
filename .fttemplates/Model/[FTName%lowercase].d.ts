import { Model } from "mongoose";
import { AllSchemas } from "./models";

export interface I<FTName> extends AllSchemas {}

export interface I<FTName>Methods {}

export interface I<FTName>Model extends Model<I<FTName>, object, I<FTName>Methods> {}
