import usersPublicRouter from "./users.public.router";
import consumerPublicRouter from "./consumer.public.router";
import infrastructurePublicRouter from "./infrastructure.public.router";
import prePublicRouter from "./pre.public.router";
import lrcPublicRouter from "./lrc.public.router";
import deIdentifierPublicRouter from "./deIdentifier.public.router";
import csvPublicRouter from "./csv.public.router";
import pdfPublicRouter from "./pdf.public.router";
import binPublicRouter from "./bin.public.router";
import sqlPublicRouter from "./sql.public.router";
import chatPublicRouter from "./chat.public.router";

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
    {
        prefix: "/chat",
        router: chatPublicRouter,
    },
    {
        prefix: "/csv",
        router: csvPublicRouter,
    },
    {
        prefix: "/pdf",
        router: pdfPublicRouter,
    },
    {
        prefix: "/bin",
        router: binPublicRouter,
    },
    {
        prefix: "/sql",
        router: sqlPublicRouter,
    },
];

export default {
    prefix: "",
    routers,
};
