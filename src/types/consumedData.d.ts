import { Document, Model } from "mongoose";

export interface IConsumedData {
    payload: any;
    headers: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IConsumedDataMethods {}

export type IConsumedDataModel = Model<IConsumedData, IConsumedDataMethods>;

export type IConsumedDataDocument = Document<IConsumedData> &
    IConsumedData &
    IConsumedDataMethods;
