import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ThemeProvider } from "eztp";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
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
            </ThemeProvider>
        </I18nextProvider>
    </React.StrictMode>
);
