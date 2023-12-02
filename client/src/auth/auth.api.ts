import { IUser } from "../../../src/types/user";
import { config } from "../config/environment.config";
import { APIClient } from "react-api-client-provider";
import { APIDocument } from "../types";
import { AxiosError } from "axios";

export type User = APIDocument<Omit<IUser, "password">>;

export type AuthUserResponse = {
    user: User;
    token: string;
};

export type Credentials = Pick<IUser, "password" | "email">;

const handleErrors = (err: AxiosError) => {
    console.log(`Auth Error: ${err}`);
    throw err;
};

const authClient = new APIClient({
    baseURL: config.apiURL + "/v1/auth",
    requestInterceptors: (opts) => ({ ...opts, withCredentials: true }),
    handleErrors: handleErrors,
});

export const register = async (credentials: Credentials) => {
    const res = await authClient.POST({
        url: "/register",
        data: credentials,
    });
    return (res.data?.data as AuthUserResponse) || null;
};

export const login = async (credentials: Credentials) => {
    const res = await authClient.POST({ url: "/login", data: credentials });
    return (res.data?.data as AuthUserResponse) || null;
};

export const logout = async () => {
    await authClient.DELETE({ url: "/logout" });
    return true;
};

export const getSession = async () => {
    const res = await authClient.GET({ url: "/me" });
    return (res.data?.data as AuthUserResponse) || null;
};
