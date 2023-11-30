import { IUser } from "../../../src/types/user";
import axios from "axios";
import { config } from "../config/environment.config";

export const login = async (credentials: Pick<IUser, "password" | "email">) => {
    const res = await axios.post(config.apiURL + "/v1/auth/login", credentials);
    return res.data;
};
