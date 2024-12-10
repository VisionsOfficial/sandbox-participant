import { CustomErrorCode, ERROR_CODES } from "./ErrorCodes";

export type CustomErrorOptions = {
    location?: string;
    message?: string;
    errorCode?: CustomErrorCode;
};

export class CustomError extends Error {
    location: string;
    isCustomError: boolean;
    errorCode: CustomErrorCode;

    constructor(options: {
        errorCode: CustomErrorCode;
        message?: string;
        location?: string;
    }) {
        super(options.message);
        this.isCustomError = true;
        this.location = options.location || "";
        this.errorCode = options.errorCode || ERROR_CODES.server0001;
    }
}
