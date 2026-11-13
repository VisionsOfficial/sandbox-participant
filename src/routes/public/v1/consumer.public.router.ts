import { Router } from "express";
import {
    consume,
    consumeAndStore,
    consumeRaw,
    getStoredData,
    getStoredDataById,
} from "../../../controllers/public/v1/consumer.public.controller";

const r: Router = Router();

/**
 * @openapi
 * /consume:
 *   post:
 *     tags: [Consumer]
 *     summary: Receive data
 *     description: Receives any JSON payload and returns it inside an acknowledgement.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: {}
 *           example:
 *             data:
 *               hello: world
 *     responses:
 *       200:
 *         description: Data received
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Received Data.
 *                 dataReceived:
 *                   description: The received payload
 *             example:
 *               message: Received Data.
 *               dataReceived:
 *                 data:
 *                   hello: world
 */
r.post("/consume", consume);

/**
 * @openapi
 * /consume/raw:
 *   post:
 *     tags: [Consumer]
 *     summary: Receive data and return it raw
 *     description: Returns the `data` property of the payload if present, otherwise the whole payload.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: {}
 *           example:
 *             data:
 *               hello: world
 *     responses:
 *       200:
 *         description: The received data, unwrapped
 *         content:
 *           application/json:
 *             schema: {}
 *             example:
 *               hello: world
 */
r.post("/consume/raw", consumeRaw);

/**
 * @openapi
 * /consume/store:
 *   post:
 *     tags: [Consumer]
 *     summary: Receive data and store it
 *     description: Stores the payload and the request headers in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: {}
 *           example:
 *             data:
 *               hello: world
 *     responses:
 *       200:
 *         description: Data received and stored
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data received and stored.
 *                 dataReceived:
 *                   description: The received payload
 *                 storedId:
 *                   type: string
 *                   example: 6750b0c2f1a2b3c4d5e6f708
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
r.post("/consume/store", consumeAndStore);

/**
 * @openapi
 * /consume/store:
 *   get:
 *     tags: [Consumer]
 *     summary: List stored data
 *     description: Lists the data stored through POST /consume/store, most recent first. Payloads larger than 256KB are omitted (payloadOmitted is true), use GET /consume/store/{id} to get them.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 25
 *           maximum: 100
 *     responses:
 *       200:
 *         description: A page of stored data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 pages:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
r.get("/consume/store", getStoredData);

/**
 * @openapi
 * /consume/store/{id}:
 *   get:
 *     tags: [Consumer]
 *     summary: Get one stored data entry
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The stored entry with its full payload and headers
 *       400:
 *         description: Invalid id
 *       404:
 *         description: Not found
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
r.get("/consume/store/:id", getStoredDataById);

export default r;
