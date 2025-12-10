import { NextFunction, Request, Response } from "express";
import { ConsumedData } from "../../../models";

/**
 * Consumer the data
 */
export const consume = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        return res.json({
            message: "Received Data.",
            dataReceived: req.body,
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
