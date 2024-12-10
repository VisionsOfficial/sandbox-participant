import { config } from "../config/environment.config";
import { APIDocument } from "../types";
import { ITodo } from "../../../src/types/todo";
import { APIClient } from "react-api-client-provider";

const todosClient = new APIClient({
    baseURL: config.apiURL + "/v1/todos",
    requestInterceptors: (opts) => ({ ...opts, withCredentials: true }),
});

export const getUserTodos = async () => {
    const res = await todosClient.GET({ url: "/me" });
    return res?.data as APIDocument<ITodo>[];
};

export const getTodos = async () => {
    const res = await todosClient.GET({ url: "/" });
    return res?.data as APIDocument<ITodo>[];
};

export const createTodo = async ({ name }: Pick<ITodo, "name">) => {
    try {
        const res = await todosClient.POST({ url: "/", data: { name } });
        return res?.data as APIDocument<ITodo>;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const updateTodo = async ({
    id,
    name,
    completed,
}: {
    id: string;
    name?: string;
    completed?: boolean;
}) => {
    try {
        const res = await todosClient.PUT({
            url: `/${id}`,
            data: { name, completed },
        });
        return res?.data as APIDocument<ITodo>;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const deleteTodo = async (id: string) => {
    try {
        const res = await todosClient.DELETE({ url: `/${id}` });
        return res?.data as APIDocument<ITodo>;
    } catch (err) {
        console.log(err);
        return null;
    }
};
