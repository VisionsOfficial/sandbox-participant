import mongoose, { Document } from "mongoose";
import { MissingMongooseDocumentError } from "../errors/MissingMongooseDocumentError";

/**
 * Returns the id of a populated or non populated field
 * without needing to know in advance if the field has been
 * properly populated
 */
export const getDocumentId = (doc: Document | string | object): string => {
    if (!doc)
        throw new MissingMongooseDocumentError({ location: "getDocumentId" });
    if (typeof doc === "string") return doc;
    if (doc instanceof mongoose.Types.ObjectId) return doc.toString();
    if (doc instanceof Document) return doc.id;
    return (doc as { _id: string })._id?.toString();
};
