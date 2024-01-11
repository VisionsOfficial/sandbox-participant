import usersPublicRouter from "./users.public.router";

const routers = [
    {
        prefix: "/users",
        router: usersPublicRouter,
    },
];

export default {
    prefix: "",
    routers,
};
