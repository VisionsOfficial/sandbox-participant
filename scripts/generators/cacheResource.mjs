import { getNameVariants } from "../utils.mjs";

export const cacheResource = (name) => {
    console.log(`🔨 Generating cache events boilerplate for ${name}`);
    const { capitalized, capitalizedSingular, singular } = getNameVariants();

    return `import { Logger } from "../../loggers";
import { CacheKeys } from "../cache.keys";
import { CacheEventCallbackHandler } from "../classes/CacheEventCallbackHandler";
import { CacheEventCallback } from "../typings";

/**
 * This serves as demo when generating the cache events file
 */
const defaultLogOnSet${capitalized}: CacheEventCallback = (key) => {
    if (key !== CacheKeys.${name}) return;
    Logger.info({
        location: "cache.${name}.defaultLogOnSet${capitalized}",
        message: \`Set key \${key} in cache\`,
    });
};

export const ${name}CacheEventCallbackHandler = new CacheEventCallbackHandler();
${name}CacheEventCallbackHandler.set.push(defaultLogOnSet${capitalized});
`;
};
