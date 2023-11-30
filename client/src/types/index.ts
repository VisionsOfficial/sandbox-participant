export type APIDocument<T> = T & {
    _id: string;
    schema_version: string;
    createdAt?: Date;
    updatedAt?: Date;
};
