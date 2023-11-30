import { Logger } from "../../loggers";
import { CacheKeys } from "../cache.keys";
import { CacheEventCallbackHandler } from "../classes/CacheEventCallbackHandler";
import { CacheEventCallback } from "../typings";

const demoLogOnSetUsers: CacheEventCallback = (key) => {
    if (key !== CacheKeys.users) return;
    Logger.info({
        location: "cache.users.demoLogOnSetUsers",
        message: `Set key ${key} in cache`,
    });
};

export const usersCacheEventCallbackHandler = new CacheEventCallbackHandler();
usersCacheEventCallbackHandler.set.push(demoLogOnSetUsers);
