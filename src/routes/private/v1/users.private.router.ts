import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import {
    deleteUserById,
    getCurrentUser,
    updateUserById,
} from "../../../controllers/private/v1/users.private.controller";
import { validate } from "../../middlewares/validator.middleware";
import { queryUserById } from "../../middlewares/queries/userQueries.middleware";
import { body, param } from "express-validator";
import {
    createUsers,
    getAllUsers,
    getUserById,
} from "../../../controllers/public/v1/users.public.controller";
import { passthroughMe } from "../../middlewares/passthrough.middleware";

const r: Router = Router();

r.use(authenticate);

/**
 * @openapi
 * /api/private/users:
 *   get:
 *     tags: [Users (private)]
 *     summary: List all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *   post:
 *     tags: [Users (private)]
 *     summary: Create or update users
 *     description: Upserts one user or an array of users by `_id`. The payload can be wrapped in a `data` property.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/UserInput'
 *               - type: array
 *                 items:
 *                   $ref: '#/components/schemas/UserInput'
 *               - type: object
 *                 properties:
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: The upserted users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
r.get("/", getAllUsers);
r.post("/", createUsers);

/**
 * @openapi
 * /api/private/users/{userId}:
 *   get:
 *     tags: [Users (private)]
 *     summary: Get a user by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200:
 *         description: The user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/UserNotFound'
 *   put:
 *     tags: [Users (private)]
 *     summary: Update a user by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               score:
 *                 type: number
 *     responses:
 *       200:
 *         description: The user before the update
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/UserNotFound'
 *   delete:
 *     tags: [Users (private)]
 *     summary: Delete a user by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       200:
 *         description: The deleted user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/UserNotFound'
 */
r.get(
    "/:userId",
    passthroughMe,
    [param("userId").isMongoId()],
    validate,
    queryUserById,
    getUserById
);
/**
 * @openapi
 * /api/private/users/me:
 *   get:
 *     tags: [Users (private)]
 *     summary: Get the user of the current session
 *     description: Requires a session (cookie). A bearer token alone does not identify the user.
 *     responses:
 *       200:
 *         description: The current user and their token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/UserNotFound'
 */
r.get("/me", getCurrentUser);
r.put(
    "/:userId",
    [body("email").optional().isEmail()],
    validate,
    queryUserById,
    updateUserById
);
r.delete(
    "/:userId",
    [param("userId").isMongoId()],
    validate,
    queryUserById,
    deleteUserById
);

export default r;
