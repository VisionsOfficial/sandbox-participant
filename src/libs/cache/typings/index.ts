export type CacheEventCallback = (key: string, value: any) => void;
export type CacheEventValue =
    | "set"
    | "del"
    | "expired"
    | "flush"
    | "flush_stats";

export type CacheEventCallbackHandlerOptions = {
    set?: CacheEventCallback[];
    del?: CacheEventCallback[];
    expired?: CacheEventCallback[];
};

export interface ICacheEventCallbackHandler {
    set: CacheEventCallback[];
    del: CacheEventCallback[];
    expired: CacheEventCallback[];
}
