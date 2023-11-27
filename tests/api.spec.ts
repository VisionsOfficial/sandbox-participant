import { expect } from "chai";
import request from "supertest";
import { Application } from "express";

import { main } from "../src/index";
import { IncomingMessage, Server, ServerResponse } from "http";

const CUSTOM_ENV = "test";
let server: Server<typeof IncomingMessage, typeof ServerResponse> =
    new Server();
let app: Application;

describe("GET /health", () => {
    before(async () => {
        const config = await main({ customEnv: CUSTOM_ENV });
        server = config.server;
        app = config.app;
    });

    it("Should respond with a status of 200", async () => {
        const response = await request(app).get("/health");
        expect(response.status).equal(200, "Status should be 200");
    });

    after(() => {
        console.log("Finished tests");
        server.close(); // Necessary otherwise mocha will not exit on its own
        process.exit();
    });
});
