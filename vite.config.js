import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: process.env.BK_SITE_URL || "/",
    plugins: [react()],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    build: {
        outDir: "build",
    },
    esbuild: {
        loader: "jsx",
        include: /src\/.*\.jsx?$/,
        exclude: [],
    },
});
