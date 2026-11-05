import path from "path";
import swaggerJSDoc from "swagger-jsdoc";

/**
 * OpenAPI specification generated from the JSDoc @openapi comments
 * found in the router files (works with both .ts sources and compiled .js)
 */
export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Visions Testing API",
            version: process.env.npm_package_version || "1.0.0",
            description: "Mock services API used for demos.",
        },
        servers: [{ url: "/" }],
        tags: [
            { name: "Consumer", description: "Mock consumer receiving data" },
            { name: "Infrastructure", description: "Mock data processing" },
            { name: "Mock data", description: "Static or random mock data" },
            { name: "Files", description: "File generation and upload" },
            { name: "NLP", description: "Fictitious general medicine records (data.gouv.fr open data) for NLP testing" },
            { name: "Chat", description: "Proxy to the chat service" },
            { name: "Users", description: "Users (no authentication)" },
            { name: "Users (private)", description: "Users, authenticated with a session or a bearer token" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            parameters: {
                Size: {
                    name: "size",
                    in: "query",
                    required: false,
                    description:
                        "Target size of the generated file: a number followed by an optional unit (B, KB, MB, GB, TB).",
                    schema: { type: "string", default: "1KB", example: "10KB" },
                },
                UserId: {
                    name: "userId",
                    in: "path",
                    required: true,
                    description: "MongoDB ObjectId of the user",
                    schema: { type: "string", example: "65bb92ddaa60e8794da7ae9c" },
                },
            },
            schemas: {
                Error: {
                    type: "object",
                    properties: {
                        error: { type: "string" },
                    },
                },
                ValidationErrors: {
                    type: "array",
                    description: "express-validator errors",
                    items: {
                        type: "object",
                        properties: {
                            type: { type: "string", example: "field" },
                            msg: { type: "string", example: "Invalid value" },
                            path: { type: "string", example: "userId" },
                            location: { type: "string", example: "params" },
                            value: {},
                        },
                    },
                },
                User: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "65bb92ddaa60e8794da7ae9c" },
                        email: { type: "string", format: "email", example: "john@doe.com" },
                        verified_email: { type: "boolean" },
                        skills: { type: "array", items: { type: "string" } },
                        schema_version: { type: "string", example: "1" },
                        score: { type: "number" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" },
                    },
                },
                UserInput: {
                    type: "object",
                    required: ["_id", "email"],
                    properties: {
                        _id: { type: "string", example: "65bb92ddaa60e8794da7ae9c" },
                        email: { type: "string", format: "email", example: "john@doe.com" },
                        skills: { type: "array", items: { type: "string" } },
                        score: { type: "number" },
                    },
                },
                UploadedFile: {
                    type: "object",
                    description: "Metadata of the uploaded file (multer)",
                    properties: {
                        fieldname: { type: "string", example: "file" },
                        originalname: { type: "string", example: "data.csv" },
                        encoding: { type: "string", example: "7bit" },
                        mimetype: { type: "string", example: "text/csv" },
                        destination: { type: "string" },
                        filename: { type: "string", example: "data1763643006767.csv" },
                        path: { type: "string" },
                        size: { type: "integer", example: 1024 },
                    },
                },
                Message: {
                    type: "object",
                    properties: {
                        message: { type: "string", example: "ok" },
                    },
                },
                Texts: {
                    type: "object",
                    properties: {
                        texts: { type: "array", items: { type: "string" } },
                    },
                },
            },
            responses: {
                InvalidSize: {
                    description: "Invalid or non-positive size",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Error" },
                            example: {
                                error: "Format invalide. Utilisez un format comme '10KB', '5MB', '1GB'.",
                            },
                        },
                    },
                },
                ServerError: {
                    description: "Internal server error",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Error" },
                        },
                    },
                },
                UserNotFound: {
                    description: "User not found",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Error" },
                            example: { error: "User not found" },
                        },
                    },
                },
                ValidationError: {
                    description: "Invalid parameters",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/ValidationErrors" },
                        },
                    },
                },
                Unauthorized: {
                    description: "Missing or invalid bearer token",
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Error" },
                            example: { error: "Authentication required" },
                        },
                    },
                },
            },
        },
    },
    apis: [
        path
            .join(__dirname, "../routes/**/*.router.{ts,js}")
            .replace(/\\/g, "/"),
    ],
});
