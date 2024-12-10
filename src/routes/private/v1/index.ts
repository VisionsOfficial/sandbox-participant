import usersPrivateRouter from "./users.private.router";

const routers = [
    {
        prefix: "/users",
        router: usersPrivateRouter,
    },
];

export default {
    prefix: "/private",
    routers,
};
