import { Router } from "express";
import { infrastructureProcessing } from "../../../controllers/public/v1/infrastructure.public.controller";

const r: Router = Router();

/**
 * @openapi
 * /infrastructure:
 *   post:
 *     tags: [Infrastructure]
 *     summary: Add a random score to the data
 *     description: |
 *       Adds a random `score` (0-99) to the received data and returns it:
 *       - a top-level array: a score is added to each element and the array is returned
 *       - `data.origin` array: a score is added to each element of `origin`, `data` is returned
 *       - `data` array of objects with `_id`: a score is added to each element, `data` is returned
 *       - `data` object: a score is added to it, `data` is returned
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: array
 *                 items:
 *                   type: object
 *               - type: object
 *                 properties:
 *                   data: {}
 *           example:
 *             data:
 *               - _id: 65bb92ddaa60e8794da7ae9c
 *                 email: john@doe.com
 *     responses:
 *       200:
 *         description: The data with a score added
 *         content:
 *           application/json:
 *             schema: {}
 *             example:
 *               - _id: 65bb92ddaa60e8794da7ae9c
 *                 email: john@doe.com
 *                 score: 42
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
r.post("/", infrastructureProcessing);

export default r;
