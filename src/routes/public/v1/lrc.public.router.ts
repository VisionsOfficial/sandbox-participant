import { Router, NextFunction, Request, Response } from "express";
import { Logger } from "../../../libs/loggers";
import { randomUUID } from "node:crypto";
import { randomString } from "../../../functions/string.functions";

const r: Router = Router();

r.get("/", (req: Request, res: Response, next: NextFunction) => {
    const body = {
        input_trace: {
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
                id: "https://activitystrea.ms/schema/1.0/access",
                display: {
                    "en-US": "Accessed",
                },
            },
            object: {
                id: "https://example.com/activity/unique_id",
                objectType: "Activity",
                definition: {
                    name: {
                        "en-US": "1EdTech Caliper Implementation Guide, pg 5",
                    },
                    description: {
                        "en-US": "No description provided",
                    },
                    type: "https://w3id.org/xapi/acrossx/activities/webpage",
                },
            },
            context: {
                contextActivities: {
                    category: {
                        id: "https://toto.org",
                        definition: {
                            type: "http://tata.org",
                        },
                    },
                },
            },
        },
    };
    Logger.info({
        message: `lrc provider sending Body: ${JSON.stringify(body, null, 2)}`,
    });
    return res.json(body);
});

export default r;
