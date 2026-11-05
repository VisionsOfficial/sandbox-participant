import { Router } from "express";
import {
    consume,
    consumeAndStore,
    consumeRaw,
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

export default r;
