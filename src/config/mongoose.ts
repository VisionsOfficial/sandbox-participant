import mongoose from "mongoose";
import { config } from "./environment";

export async function loadMongoose(mongoURI?: string) {
    const connect = await mongoose.connect(
        mongoURI ? mongoURI : config.mongoURI
    );
    const connection = connect.connection;
    connection.on(
        "error",
        // eslint-disable-next-line
        console.error.bind(console, "MongoDB connection error: ")
    );

    return connection;
}

/**
 * Default options when querying for pagination
 */
export const DEFAULT_QUERY_OPTIONS = {
    page: 0,
    limit: 50,
};
