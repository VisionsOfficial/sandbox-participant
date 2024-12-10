import { startServer } from "./server";
import { setupEnvironment } from "./config/environment";
import { loadMongoose } from "./config/mongoose";

export const main = async (options?: {
    customEnv?: string;
    mongoURI?: string;
    port?: number;
}) => {
    const { customEnv, port } = options;
    setupEnvironment(customEnv);
    await loadMongoose();
    const { server, app } = await startServer(port);
    return { server, app };
};

main({ mongoURI: process.env.MONGO_URI });
