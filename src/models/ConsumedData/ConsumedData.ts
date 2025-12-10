import mongoose from "mongoose";
import { consumedDataSchema } from "./ConsumedData.model";
import { IConsumedDataDocument } from "../../types/consumedData";

export const ConsumedData = mongoose.model<IConsumedDataDocument>(
    "ConsumedData",
    consumedDataSchema
);
