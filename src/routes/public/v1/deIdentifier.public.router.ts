import { Router, NextFunction, Request, Response } from "express";
import { Logger } from "../../../libs/loggers";
import { randomUUID } from "node:crypto";
import { randomString } from "../../../functions/string.functions";

const r: Router = Router();

/**
 * @openapi
 * /de-identifier:
 *   get:
 *     tags: [Mock data]
 *     summary: Get a random xAPI trace (de-identifier)
 *     description: Returns an xAPI statement with a random id, timestamp and actor, to be de-identified.
 *     responses:
 *       200:
 *         description: xAPI trace
 *         content:
 *           application/json:
 *             example:
 *               trace:
 *                 data:
 *                   timestamp: "2026-11-05T10:00:00.000Z"
 *                   id: 3f2b8c1e-7a4d-4f6b-9c2e-1d5a8b7c6e4f
 *                   actor:
 *                     account:
 *                       homePage: https://abcdefgh.xy/
 *                       name: abcdefgh
 *                     objectType: Agent
 *                   verb:
 *                     id: https://w3id.org/xapi/netc/verbs/accessed
 *                     display:
 *                       en-US: Accessed a page
 *                   object:
 *                     id: https://example.com/activity/unique_id
 *                     objectType: Activity
 *                     definition:
 *                       name:
 *                         en-US: 1EdTech Caliper Implementation Guide, pg 5
 *                       description:
 *                         en-US: No description provided
 *                       type: https://w3id.org/xapi/acrossx/activities/webpage
 *                   context:
 *                     contextActivities:
 *                       category:
 *                         - id: https://toto.org
 *                           definition:
 *                             type: http://tata.org
 *                         - id: https://w3id.org/xapi/lms
 *                           definition:
 *                             type: http://adlnet.gov/expapi/activities/profile
 *                   version: 1.0.0
 */
r.get("/", (req: Request, res: Response, next: NextFunction) => {
    const body = {
        trace: {
            data: {
                timestamp: new Date().toISOString(),
                id: randomUUID(),
                actor: {
                    account: {
                        homePage: `https://${randomString(
                            8
                        ).toLowerCase()}.${randomString(2)}/`,
                        name: `${randomString(8).toLowerCase()}`,
                    },
                    objectType: "Agent",
                },
                verb: {
                    id: "https://w3id.org/xapi/netc/verbs/accessed",
                    display: {
                        "en-US": "Accessed a page",
                    },
                },
                object: {
                    id: "https://example.com/activity/unique_id",
                    objectType: "Activity",
                    definition: {
                        name: {
                            "en-US":
                                "1EdTech Caliper Implementation Guide, pg 5",
                        },
                        description: {
                            "en-US": "No description provided",
                        },
                        type: "https://w3id.org/xapi/acrossx/activities/webpage",
                    },
                },
                context: {
                    contextActivities: {
                        category: [
                            {
                                id: "https://toto.org",
                                definition: {
                                    type: "http://tata.org",
                                },
                            },
                            {
                                id: "https://w3id.org/xapi/lms",
                                definition: {
                                    type: "http://adlnet.gov/expapi/activities/profile",
                                },
                            },
                        ],
                    },
                },
                version: "1.0.0",
            },
        },
    };
    Logger.info({
        message: `de-identifier provider sending Body: ${JSON.stringify(body, null, 2)}`,
    });
    return res.json(body);
});

export default r;
