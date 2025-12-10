import { expect } from "chai";
import request from "supertest";
import { Application } from "express";
import { IncomingMessage, Server, ServerResponse } from "http";
import { main } from "../src/index";
import { ConsumedData } from "../src/models";

const CUSTOM_ENV = "test";
let server: Server<typeof IncomingMessage, typeof ServerResponse> = new Server();
let app: Application;

describe("POST /consume/store - consumeAndStore", () => {
    before(async () => {
        const config = await main({ customEnv: CUSTOM_ENV });
        server = config.server;
        app = config.app;
    });

    afterEach(async () => {
        // Clean up consumed data after each test
        await ConsumedData.deleteMany({});
    });

    after(() => {
        console.log("Finished consumeAndStore tests");
        server.close();
        process.exit();
    });

    describe("Success cases", () => {
        it("Should store data with payload and headers and return 200", async () => {
            const testPayload = { test: "data", message: "hello world" };
            const customHeader = "test-value";

            const response = await request(app)
                .post("/consume/store")
                .set("x-custom-header", customHeader)
                .send(testPayload);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("message", "Data received and stored.");
            expect(response.body).to.have.property("dataReceived");
            expect(response.body.dataReceived).to.deep.equal(testPayload);
            expect(response.body).to.have.property("storedId");
        });

        it("Should save the data to the database", async () => {
            const testPayload = { user: "john", action: "login" };

            const response = await request(app)
                .post("/consume/store")
                .send(testPayload);

            const storedId = response.body.storedId;
            const savedData = await ConsumedData.findById(storedId);

            expect(savedData).to.not.be.null;
            expect(savedData?.payload).to.deep.equal(testPayload);
            expect(savedData?.headers).to.be.an("object");
        });

        it("Should store custom headers correctly", async () => {
            const testPayload = { event: "click" };
            const customHeaders = {
                "x-user-id": "12345",
                "x-session-id": "abc-xyz",
                "x-api-key": "secret-key",
            };

            const response = await request(app)
                .post("/consume/store")
                .set(customHeaders)
                .send(testPayload);

            const storedId = response.body.storedId;
            const savedData = await ConsumedData.findById(storedId);

            expect(savedData?.headers).to.include({
                "x-user-id": "12345",
                "x-session-id": "abc-xyz",
                "x-api-key": "secret-key",
            });
        });

        it("Should handle empty payload", async () => {
            const response = await request(app)
                .post("/consume/store")
                .send({});

            expect(response.status).to.equal(200);
            expect(response.body.dataReceived).to.deep.equal({});
        });

        it("Should store complex nested objects", async () => {
            const complexPayload = {
                user: {
                    id: 1,
                    name: "John Doe",
                    preferences: {
                        theme: "dark",
                        notifications: true,
                    },
                },
                metadata: {
                    timestamp: Date.now(),
                    source: "web",
                },
                tags: ["important", "urgent"],
            };

            const response = await request(app)
                .post("/consume/store")
                .send(complexPayload);

            expect(response.status).to.equal(200);
            
            const savedData = await ConsumedData.findById(response.body.storedId);
            expect(savedData?.payload).to.deep.equal(complexPayload);
        });

        it("Should store arrays in payload", async () => {
            const arrayPayload = {
                items: [1, 2, 3, 4, 5],
                users: ["alice", "bob", "charlie"],
            };

            const response = await request(app)
                .post("/consume/store")
                .send(arrayPayload);

            expect(response.status).to.equal(200);
            
            const savedData = await ConsumedData.findById(response.body.storedId);
            expect(savedData?.payload.items).to.have.lengthOf(5);
            expect(savedData?.payload.users).to.include("alice");
        });

        it("Should create multiple entries independently", async () => {
            const payload1 = { entry: 1 };
            const payload2 = { entry: 2 };

            const response1 = await request(app)
                .post("/consume/store")
                .send(payload1);

            const response2 = await request(app)
                .post("/consume/store")
                .send(payload2);

            expect(response1.body.storedId).to.not.equal(response2.body.storedId);

            const count = await ConsumedData.countDocuments();
            expect(count).to.equal(2);
        });

        it("Should have createdAt timestamp", async () => {
            const testPayload = { timestamp: "test" };

            const response = await request(app)
                .post("/consume/store")
                .send(testPayload);

            const savedData = await ConsumedData.findById(response.body.storedId);
            expect(savedData?.createdAt).to.be.instanceOf(Date);
        });
    });

    describe("Edge cases", () => {
        it("Should handle large payloads", async () => {
            const largePayload = {
                data: Array(1000).fill({ key: "value", number: 123 }),
            };

            const response = await request(app)
                .post("/consume/store")
                .send(largePayload);

            expect(response.status).to.equal(200);
            expect(response.body.storedId).to.exist;
        });

        it("Should handle special characters in payload", async () => {
            const specialPayload = {
                text: "Hello! @#$%^&*()_+-={}[]|\\:\";<>?,./",
                emoji: "🎉🚀💻",
                unicode: "café résumé naïve",
            };

            const response = await request(app)
                .post("/consume/store")
                .send(specialPayload);

            expect(response.status).to.equal(200);
            
            const savedData = await ConsumedData.findById(response.body.storedId);
            expect(savedData?.payload.emoji).to.equal("🎉🚀💻");
        });

        it("Should handle null values in payload", async () => {
            const payloadWithNull = {
                value: null,
                name: "test",
            };

            const response = await request(app)
                .post("/consume/store")
                .send(payloadWithNull);

            expect(response.status).to.equal(200);
            
            const savedData = await ConsumedData.findById(response.body.storedId);
            expect(savedData?.payload.value).to.be.null;
        });

        it("Should handle boolean and number types", async () => {
            const mixedPayload = {
                isActive: true,
                count: 42,
                price: 19.99,
                flag: false,
            };

            const response = await request(app)
                .post("/consume/store")
                .send(mixedPayload);

            expect(response.status).to.equal(200);
            
            const savedData = await ConsumedData.findById(response.body.storedId);
            expect(savedData?.payload.isActive).to.be.true;
            expect(savedData?.payload.count).to.equal(42);
        });
    });

    describe("Headers validation", () => {
        it("Should store standard HTTP headers", async () => {
            const response = await request(app)
                .post("/consume/store")
                .set("Content-Type", "application/json")
                .set("User-Agent", "TestAgent/1.0")
                .send({ test: "data" });

            const savedData = await ConsumedData.findById(response.body.storedId);
            expect(savedData?.headers).to.have.property("content-type");
            expect(savedData?.headers).to.have.property("user-agent");
        });

        it("Should store request without custom headers", async () => {
            const response = await request(app)
                .post("/consume/store")
                .send({ basic: "request" });

            expect(response.status).to.equal(200);
            
            const savedData = await ConsumedData.findById(response.body.storedId);
            expect(savedData?.headers).to.be.an("object");
            expect(savedData?.headers).to.have.property("host");
        });
    });

    describe("Response structure validation", () => {
        it("Should return correct response structure", async () => {
            const response = await request(app)
                .post("/consume/store")
                .send({ test: "structure" });

            expect(response.body).to.have.all.keys("message", "dataReceived", "storedId");
            expect(response.body.message).to.be.a("string");
            expect(response.body.dataReceived).to.be.an("object");
            expect(response.body.storedId).to.be.a("string");
        });

        it("Should return valid MongoDB ObjectId", async () => {
            const response = await request(app)
                .post("/consume/store")
                .send({ test: "objectid" });

            const storedId = response.body.storedId;
            expect(storedId).to.match(/^[a-f\d]{24}$/i);
        });
    });
});
