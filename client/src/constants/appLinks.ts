export const APP_LINK = {
    public: {
        home: "/",
        register: "/auth/register",
        login: "/auth/login",
    },
    private: {
        home: "/app",
        profile: "/app/profile",
        examples: {
            todos: "/app/todos",
            todo: (todoId?: string) => `/app/todo/${todoId ?? ":todoId"}`,
        },
    },
};
