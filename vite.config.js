import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

export default defineConfig(({ mode }) => {
    // 根据当前模式，手动加载 .bk.{mode}.env 文件
    const envFile = `.bk.${mode}.env`;
    const envConfig = dotenv.config({ path: envFile }).parsed || {};

    return {
        base: envConfig.BK_SITE_URL || "/",
        define: {
            "process.env.BK_SITE_URL": JSON.stringify(envConfig.BK_SITE_URL),
        },
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
    };
});
