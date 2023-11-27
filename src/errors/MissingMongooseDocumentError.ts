import { CustomError, CustomErrorOptions } from "./CustomError";
import { ERROR_CODES } from "./ErrorCodes";

export class MissingMongooseDocumentError extends CustomError {
    isMissingMongooseDocumentError: boolean;
    parentDocumentId: string | null;

    constructor(
        options?: CustomErrorOptions & {
            /**
             * ID of the parent document if there is one
             * as it might mean there is a broken reference
             */
            parentDocumentId?: string;
        }
    ) {
        super({
            ...options,
            message: options.message || "Mongoose document or _id is missing",
            errorCode: options.errorCode || ERROR_CODES.mongo0001,
        });
        this.isMissingMongooseDocumentError = true;
        this.parentDocumentId = options.parentDocumentId;
    }
}
