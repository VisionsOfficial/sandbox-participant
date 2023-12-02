export const APP_LINK = {
    public: {
        home: "/",
        register: "/auth/register",
        login: "/auth/login",
    },
    private: {
        home: "/app",
        examples: {
            todos: "/app/todos",
            todo: (todoId?: string) => `/app/todo/${todoId ?? ":todoId"}`,
        },
    },
};
