import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { ConsumedData } from "../../../models";
import { Logger } from '../../../libs/loggers';

/**
 * Consumer the data
 */
export const consume = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body;
        Logger.info({
            message: `infrastructureProcessing received Body: ${JSON.stringify(
                body,
                null,
                2
            )}`,
        });
        return res.json({
            message: "Received Data.",
            dataReceived: body,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Consumer the data
 */
export const consumeRaw = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body;
        Logger.info({
            message: `infrastructureProcessing received Body: ${JSON.stringify(
                body,
                null,
                2
            )}`,
        });
        return res.json(body?.data ?? body);
    } catch (err) {
        next(err);
    }
};

/**
 * Consumer the data
 */
export const cadastral = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body;
        Logger.info({
            message: `received Body: ${JSON.stringify(
                body,
                null,
                2
            )}`,
        });
        return res.json({
            "type": "FeatureCollection",
            "properties": {
                "message": "No spatial features provided",
                "analysis": {
                    "finland": {
                        "count": 0,
                        "avg_area": 0,
                        "median_area": 0,
                        "min_area": 0,
                        "max_area": 0,
                        "avg_perimeter": 0,
                        "median_perimeter": 0,
                        "avg_compactness": 0,
                        "median_compactness": 0
                    },
                    "estonia": {
                        "count": 0,
                        "avg_area": 0,
                        "median_area": 0,
                        "min_area": 0,
                        "max_area": 0,
                        "avg_perimeter": 0,
                        "median_perimeter": 0,
                        "avg_compactness": 0,
                        "median_compactness": 0
                    }
                },
                "differences": {}
            },
            "features": []
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Consumer the data and store it
 */
export const consumeAndStore = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const consumedData = new ConsumedData({
            payload: req.body,
            headers: req.headers,
        });

        await consumedData.save();

        return res.json({
            message: "Data received and stored.",
            dataReceived: req.body,
            storedId: consumedData._id,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Payloads above this size (in bytes) are not embedded in the list response,
 * the viewer loads them on demand through the detail route.
 */
const LIST_PAYLOAD_MAX_BYTES = 256 * 1024;

/**
 * Lists the stored data, most recent first
 */
export const getStoredData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const limit = Math.min(
            Math.max(parseInt(req.query.limit as string) || 25, 1),
            100
        );
        const page = Math.max(parseInt(req.query.page as string) || 1, 1);

        const [total, items] = await Promise.all([
            ConsumedData.countDocuments(),
            ConsumedData.aggregate([
                { $sort: { createdAt: -1, _id: -1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
                { $addFields: { size: { $bsonSize: "$$ROOT" } } },
                {
                    $addFields: {
                        payloadOmitted: {
                            $gt: ["$size", LIST_PAYLOAD_MAX_BYTES],
                        },
                    },
                },
                {
                    $addFields: {
                        payload: {
                            $cond: ["$payloadOmitted", "$$REMOVE", "$payload"],
                        },
                    },
                },
            ]).allowDiskUse(true),
        ]);

        return res.json({
            total,
            page,
            limit,
            pages: Math.max(Math.ceil(total / limit), 1),
            items,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Returns one stored data entry with its full payload
 */
export const getStoredDataById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: "Invalid id." });
        }

        const consumedData = await ConsumedData.findById(req.params.id).lean();

        if (!consumedData) {
            return res.status(404).json({ message: "Stored data not found." });
        }

        return res.json(consumedData);
    } catch (err) {
        next(err);
    }
};
