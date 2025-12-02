import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
    // 根据当前模式加载 .bk.{mode}.env 文件
    const env = loadEnv(mode, process.cwd(), ".bk");

    return {
        base: env.BK_SITE_URL || "/",
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
