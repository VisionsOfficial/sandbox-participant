import { Schema } from "mongoose";
import { I<FTName>, I<FTName>Model, I<FTName>Methods } from "../../types/<FTName | lowercase>";

export const virtuals = (schema: Schema<I<FTName>, I<FTName>Model, I<FTName>Methods>) => {
    // schema.virtual("population", {
    //     ref: "Target",
    //     localField: "_id",
    //     foreignField: "population",
    // });
}
