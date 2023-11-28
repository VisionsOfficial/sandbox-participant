export { getDocumentId } from "./utils.mongoose";
import users from "./users.mongoose";

/**
 * Queries for configured models
 */
export const modelQueries = {
    User: users,
};
