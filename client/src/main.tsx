import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ThemeProvider } from "eztp";
import { TanstackQueryClient } from "./libs/tanstack-query/TanstackQueryClient.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={TanstackQueryClient}>
            <I18nextProvider i18n={i18n}>
                <ThemeProvider
                    themes={[
                        {
                            theme: "light",
                            vars: { "--color-primary": "#ececec" },
                        },
                    ]}
                >
                    <App />
                    <ReactQueryDevtools />
                </ThemeProvider>
            </I18nextProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
