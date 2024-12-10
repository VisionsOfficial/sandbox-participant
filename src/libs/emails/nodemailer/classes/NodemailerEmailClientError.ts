import {
    CustomError,
    CustomErrorOptions,
} from "../../../../errors/CustomError";
import { ERROR_CODES } from "../../../../errors/ErrorCodes";

export class NodemailerEmailClientError extends CustomError {
    isNodemailerEmailClientError = true;

    constructor(options: CustomErrorOptions) {
        super({
            ...options,
            errorCode: ERROR_CODES.email0004,
            message:
                options.message || "Failed to send email through email client",
        });
    }
}
