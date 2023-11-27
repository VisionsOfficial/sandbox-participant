import mongoose from "mongoose";
import {
    I<FTName>,
    I<FTName>Model,
} from "src/types/models/<FTName | lowercase>";
import { <FTName | lowercasefirstchar>Schema } from "./<FTName>.model";
import { statics } from "./statics";
import { methods } from "./methods";
import { hooks } from "./hooks";
import { virtuals } from "./virtuals";

statics(<FTName | lowercasefirstchar>Schema);
methods(<FTName | lowercasefirstchar>Schema);
hooks(<FTName | lowercasefirstchar>Schema);
virtuals(<FTName | lowercasefirstchar>Schema);

/**
 * <FTName>
 */
export const <FTName> = mongoose.model<I<FTName>, I<FTName>Model>("<FTName>", <FTName | lowercasefirstchar>Schema);
