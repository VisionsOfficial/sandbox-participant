import { Schema } from "mongoose";
import { I<FTName>, I<FTName>Model, I<FTName>Methods } from "../../types/<FTName | lowercase>";

export const <FTName | lowercasefirstchar>Schema = new Schema<I<FTName>, I<FTName>Model, I<FTName>Methods>(
    {
        schema_version: { type: String, default: "1" },
    },
    {
        timestamps: true,
        query: {},
    }
);
