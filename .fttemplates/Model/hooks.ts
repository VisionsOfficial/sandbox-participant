import { Schema, Types } from "mongoose";
import { I<FTName>, I<FTName>Model, I<FTName>Methods } from "src/types/models/<FTName | lowercase>";

export const hooks = (schema: Schema<I<FTName>, I<FTName>Model, I<FTName>Methods>) => {
    // schema.pre("save", function (next: any) {
    //     next();
    // })
}
