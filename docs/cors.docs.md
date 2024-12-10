# CORS

Cors has some specifications when working with express session and a client running axios. There are some caveats when wanting to make the session cookie persist and be provided by the client to the server.

## Server Config

```ts
app.use(cors({ origin: true, credentials: true }));
```

Specifying the `{credentials: true}` is necessary to retain the credentials for incoming requests

## Session Config

Sometimes had issues with different configurations so setting the one that works currently.

```ts
session({
    genid: () => {
        return crypto.randomUUID();
    },
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: false,
    name: config.sessionCookieName,
    cookie: {
        sameSite: config.env === "production" ? "none" : "lax",
        secure: config.env === "production",
        maxAge: config.sessionCookieDuration,
    },
    store: MongoStore.create({ mongoUrl: config.mongoURI }),
});
```

## Client Axios config

Axios should be configured for all authenticated requests to send with the {withCredentials: true} option. This is what enables requests to associate the session cookie to the requests after authentication.
