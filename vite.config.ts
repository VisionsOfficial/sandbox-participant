import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    root: "front",
    server: {
        proxy: {
            "/api": "http://localhost:3321", // Assuming your backend runs on port 3000
        },
    },
    build: {
        outDir: "./dist",
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./front"),
        },
    },
});
