import usersPublicRouter from "./users.public.router";
import consumerPublicRouter from "./consumer.public.router";

const routers = [
    {
        prefix: "/users",
        router: usersPublicRouter,
    },
    {
        prefix: "/",
        router: consumerPublicRouter,
    },
];

export default {
    prefix: "",
    routers,
};
