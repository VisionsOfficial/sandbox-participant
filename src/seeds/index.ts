import mongoose from "mongoose";
import { User } from "../models";
import { userSeed } from "./users.seed";
import { loadMongoose } from "../config/mongoose";
import { Logger } from "../libs/loggers";

const runSeed = async () => {
    try {
        await loadMongoose();
        const users = userSeed.map((u) => {
            const nu = new User(u);
            return nu;
        });

        await Promise.all(users.map((u) => u.save()));
        // console.log("Seed data inserted successfully");
    } catch (err) {
        // console.log(`Seed data insertion failed: ${err.message}`);
    } finally {
        await mongoose.disconnect();
    }
};

runSeed();
