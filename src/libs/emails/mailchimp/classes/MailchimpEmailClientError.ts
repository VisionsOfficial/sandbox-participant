import {
    CustomError,
    CustomErrorOptions,
} from "../../../../errors/CustomError";
import { ERROR_CODES } from "../../../../errors/ErrorCodes";

export class MailchimpEmailClientError extends CustomError {
    isMailchimpEmailClientError = true;

    constructor(options: CustomErrorOptions) {
        super({
            ...options,
            errorCode: ERROR_CODES.email0001,
            message:
                options.message || "Failed to send email through email client",
        });
    }
}
