import { Schema } from "mongoose";
import {
    IConsumedData,
    IConsumedDataMethods,
    IConsumedDataModel,
} from "../../types/consumedData";

export const consumedDataSchema = new Schema<
    IConsumedData,
    IConsumedDataModel,
    IConsumedDataMethods
>(
    {
        payload: { type: Schema.Types.Mixed, required: true },
        headers: { type: Schema.Types.Mixed, required: true },
    },
    {
        timestamps: true,
        query: {},
    }
);
