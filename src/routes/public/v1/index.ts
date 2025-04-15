import usersPublicRouter from "./users.public.router";
import consumerPublicRouter from "./consumer.public.router";
import infrastructurePublicRouter from "./infrastructure.public.router";
import prePublicRouter from "./pre.public.router";
import lrcPublicRouter from "./lrc.public.router";
import deIdentifierPublicRouter from "./deIdentifier.public.router";

const routers = [
    {
        prefix: "/users",
        router: usersPublicRouter,
    },
    {
        prefix: "/",
        router: consumerPublicRouter,
    },
    {
        prefix: "/infrastructure",
        router: infrastructurePublicRouter,
    },
    {
        prefix: "/pre",
        router: prePublicRouter,
    },
    {
        prefix: "/lrc",
        router: lrcPublicRouter,
    },
    {
        prefix: "/de-identifier",
        router: deIdentifierPublicRouter,
    },
];

export default {
    prefix: "",
    routers,
};
