import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { IncomingMessage, Server, ServerResponse } from "http";
import { config } from "./config/environment";
import { setupSession } from "./config/session";
import routes from "./libs/loaders/routes";
import { instrument } from "@socket.io/admin-ui";
import { Logger, morganLogs } from "./libs/loggers";
import { Server as SocketioServer } from "socket.io";

export type AppServer = {
    app: express.Application;
    server: Server<typeof IncomingMessage, typeof ServerResponse>;
};

/**
 * Starts the express server
 * @param port Defined only when needed for testing purposes
 * @returns The app and the server, to avoid testing libraries to re-define a server
 */
export const startServer = async (port?: number) => {
    const app = express();

    app.use(cors({ origin: true, credentials: true }));
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", async (req: Request, res: Response) => {
        return res.status(200).send("Welcome to the API");
    });

    app.get("/health", (req: Request, res: Response) => {
        return res.status(200).send("OK");
    });

    if (config.env === "development") {
        app.get("/env", async (req: Request, res: Response) => {
            return res.json(config);
        });
    }

    app.use(setupSession());
    app.use(morganLogs);

    routes(app);

    const PORT = port ? port : config.port;

    const server = app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log("Server running on: http://localhost:" + PORT);
    });

    const io = new SocketioServer(server, {
        cors: {
            origin: [config.clientAppURL, "https://admin.socket.io"],
        },
    });

    instrument(io, { auth: false, mode: "development" });

    io.on("connect", (socket) => {
        socket.on("send-message", (data) => {
            io.emit("receive-message", data);
        });
    });

    return { app, server } as AppServer;
};
