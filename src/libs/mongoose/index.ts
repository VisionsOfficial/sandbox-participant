export { getDocumentId } from "./utils.mongoose";
import users from "./users.mongoose";

/**
 * Queries for configured models
 */
export const mongooseModelQueries = {
    User: users,
};
