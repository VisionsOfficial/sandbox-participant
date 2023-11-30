export type CustomErrorCode = {
    /**
     * Internal recognizable code for
     * Error handling in logs etc
     */
    code: string;

    /**
     * Status code associated to the error
     * for the global error handler to return
     * the appropriate status
     */
    status: number;
};

export const ERROR_CODES = {
    /**
     * Missing id or document reference error
     */
    mongo0001: { code: "MONGO-0001", status: 404 },

    /**
     * Mandrill Client Unhandled error
     */
    email0001: { code: "EMAIL-0001", status: 424 },

    /**
     * Mandrill Client Error in sendEmail
     */
    email0002: { code: "EMAIL-0002", status: 424 },

    /**
     * Mandrill Client Error in send email from local template
     */
    email0003: { code: "EMAIL-0003", status: 424 },

    /**
     * Nodemailer Client Error in send message
     */
    email0004: { code: "EMAIL-0004", status: 424 },

    /**
     * Nodemailer Client Error in attempt to send email with local template
     */
    email0005: { code: "EMAIL-0005", status: 424 },

    /**
     * Unknown / unhandled server error
     */
    server0001: { code: "SERVER-0001", status: 500 },
} as const;
