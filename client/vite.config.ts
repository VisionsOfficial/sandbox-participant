import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";

import { config } from "dotenv";
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const translationFile = path.join(
    __dirname,
    "public",
    "locales",
    "en",
    "translation.json"
);

// Custom plugin to observe the changes made in the main
// translation.json file to update the translation variables
// directly and make them accessible to development
const generateTranslationKeysCommand = "pnpm generate:translation";
export const watchTranslationFileChanges = () => {
    // return; /** Uncomment this to deactivate */
    fs.watchFile(translationFile, (curr, prev) => {
        if (curr.mtime !== prev.mtime) {
            exec(generateTranslationKeysCommand, (error, stdout) => {
                if (error) {
                    console.error(
                        `Error executing pnpm generate:translation : ${error}`
                    );
                    return;
                }
                console.log(stdout);
            });
        }
    });
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        {
            name: "watch-translation-file",
            configureServer() {
                watchTranslationFileChanges();
            },
        },
    ],
    build: {
        outDir: "../dist/public",
    },
    server: {
        port: parseInt(process.env.PORT) || 5173,
        proxy: {
            "/v1": {
                target: process.env.VITE_API_URL,
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, ""),
                ws: true,
                secure: false,
            },
        },
    },
});
