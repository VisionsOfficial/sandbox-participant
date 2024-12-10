export const CacheKeys = {
    users: "users",
};

export type CacheKey = keyof typeof CacheKeys & string;
