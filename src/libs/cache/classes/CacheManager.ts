import NodeCache from "node-cache";
import { CacheKey } from "../cache.keys";

export class CacheManager {
    /**
     * The global app cache instance
     */
    cache: NodeCache;
    baseTtl: number;

    constructor(cache: NodeCache, baseTtl = 0) {
        this.cache = cache;
        this.baseTtl = baseTtl;
    }

    /**
     * Sets a key value pair. It is possible to define a ttl (in seconds). Returns true on success.
     * @param key {CackeKey} the cache key to set
     * @param value {any} the value to set
     * @param ttl {number} time to live in seconds
     */
    set(key: CacheKey, value: any, ttl = this.baseTtl) {
        return this.cache.set(key, value, ttl);
    }

    /**
     * Sets multiple key val pairs. It is possible to define a ttl (seconds). Returns true on success.
     */
    mset(keyValueSet: { key: CacheKey; val: any; ttl?: number }[]) {
        return this.cache.mset(keyValueSet);
    }

    /**
     * Gets a saved value from the cache. Returns a undefined if not found or expired. If the value was found it returns the value.
     */
    get(key: CacheKey) {
        return this.cache.get(key);
    }

    // TODO Augment with pagination possibilities

    /**
     * get the cached value and remove the key from the cache.
     * Equivalent to calling get(key) + del(key).
     * Useful for implementing single use mechanism such as OTP,
     * where once a value is read it will become obsolete.
     */
    take(key: CacheKey) {
        return this.cache.take(key);
    }

    /**
     * Gets multiple saved values from the cache.
     * Returns an empty object {} if not found or expired.
     * If the value was found it returns an object with the key value pair.
     */
    mget(keys: CacheKey[]) {
        return this.cache.mget(keys);
    }

    /**
     * Delete a key.
     * Returns the number of deleted entries.
     * A delete will never fail.
     */
    del(key: CacheKey) {
        return this.cache.del(key);
    }

    /**
     * Delete multiple keys.
     * Returns the number of deleted entries.
     * A delete will never fail.
     */
    mdel(keys: CacheKey[]) {
        return this.cache.del(keys);
    }

    /**
     * Redefine the ttl of a key. Returns true if the key has been found and changed. Otherwise returns false.
     * If the ttl-argument isn't passed the default-TTL will be used.
     * The key will be deleted when passing in a ttl < 0.
     */
    changeTtl(key: CacheKey, ttl: number) {
        return this.cache.ttl(key, ttl);
    }

    /**
     * Receive the ttl of a key. Returns:
     * - undefined if the key does not exist
     * - 0 if this key has no ttl
     * - a timestamp in ms representing the time at which the key will expire
     */
    getTtl(key: CacheKey) {
        return this.cache.getTtl(key);
    }

    /**
     * Gets available keys in cache
     * @returns List of string keys
     */
    list() {
        return this.cache.keys();
    }

    /**
     * Gets available keys in cache
     * @returns List of string keys
     */
    keys() {
        return this.cache.keys();
    }

    /**
     * Returns a boolean indicating if the key is cached
     */
    has(key: CacheKey) {
        return this.cache.has(key);
    }

    /**
     * Returns the statistics
     */
    stats() {
        return this.cache.getStats();
    }

    /**
     * Flush all data
     */
    flush() {
        return this.cache.flushAll();
    }

    /**
     * Flush the stats
     */
    flushStats() {
        return this.cache.flushStats();
    }
}
