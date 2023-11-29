import { Logger } from "../../loggers";
import { CacheEventCallbackHandler } from "../classes/CacheEventCallbackHandler";
import { CacheEventCallback } from "../typings";

const onCacheSet: CacheEventCallback = (key) => {
    Logger.debug({
        location: "cache.onCacheSet",
        message: `Set ${key} in cache`,
    });
};

const onCacheDel: CacheEventCallback = (key) => {
    Logger.debug({
        location: "cache.onCacheDel",
        message: `Del ${key} in cache`,
    });
};

const onCacheExpired: CacheEventCallback = (key) => {
    Logger.debug({
        location: "cache.onCacheExpired",
        message: `Key ${key} expired from cache`,
    });
};

export const globalCacheEventCallbackHandler = new CacheEventCallbackHandler({
    set: [onCacheSet],
    del: [onCacheDel],
    expired: [onCacheExpired],
});
