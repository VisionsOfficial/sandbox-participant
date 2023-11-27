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
     * Unknown / unhandled server error
     */
    server0001: { code: "SERVER-0001", status: 500 },
} as const;
