import mongoose from "mongoose";
import {
    I<FTName>,
    I<FTName>Model,
} from "../../types/<FTName | lowercase>";
import { <FTName | lowercasefirstchar>Schema } from "./<FTName>.model";
import { statics } from "./<FTName>.statics";
import { methods } from "./<FTName>.methods";
import { hooks } from "./<FTName>.hooks";
import { virtuals } from "./<FTName>.virtuals";

statics(<FTName | lowercasefirstchar>Schema);
methods(<FTName | lowercasefirstchar>Schema);
hooks(<FTName | lowercasefirstchar>Schema);
virtuals(<FTName | lowercasefirstchar>Schema);

/**
 * <FTName>
 */
export const <FTName> = mongoose.model<I<FTName>, I<FTName>Model>("<FTName>", <FTName | lowercasefirstchar>Schema);
