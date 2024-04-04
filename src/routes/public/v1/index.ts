import usersPublicRouter from "./users.public.router";
import frontPublicRouter from "./front.public.router";

const routers = [
    {
        prefix: "/users",
        router: usersPublicRouter,
    },
    {
        prefix: "/",
        router: frontPublicRouter,
    },
];

export default {
    prefix: "",
    routers,
};
