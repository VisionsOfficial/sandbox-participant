import {
    CacheEventCallback,
    CacheEventCallbackHandlerOptions,
    ICacheEventCallbackHandler,
} from "../typings";

export class CacheEventCallbackHandler implements ICacheEventCallbackHandler {
    set: CacheEventCallback[];
    del: CacheEventCallback[];
    expired: CacheEventCallback[];

    constructor(options?: CacheEventCallbackHandlerOptions) {
        this.set = options?.set || [];
        this.del = options?.del || [];
        this.expired = options?.expired || [];
    }
}
