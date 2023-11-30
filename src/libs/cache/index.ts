import NodeCache from "node-cache";
import CacheHandlers from "./events";
import { CacheManager } from "./classes/CacheManager";
import { Logger } from "../loggers";
import { config } from "../../config/environment";

const cache = new NodeCache();

Object.values(CacheHandlers).forEach((cacheHandler) => {
    cacheHandler.del.forEach((del) => cache.on("del", del));
    cacheHandler.set.forEach((set) => cache.on("set", set));
    cacheHandler.expired.forEach((expired) => cache.on("expired", expired));
});

cache.on("flush", () => {
    Logger.debug({ location: "cache.init", message: "Flushed cache" });
});

cache.on("flush_stats", () => {
    Logger.debug({ location: "cache.init", message: "Flushed cache stats" });
});

export const AppCache = new CacheManager(cache, config.cacheBaseTtl);
