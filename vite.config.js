import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

export default defineConfig(({ mode }) => {
    // 根据当前模式，手动加载 .bk.{mode}.env 文件
    const envFile = `.bk.${mode}.env`;
    const envConfig = dotenv.config({ path: envFile }).parsed || {};

    return {
        base: './',
        build: {
            outDir: 'build',
            assetsDir: 'static'
        },
        plugins: [react()],
        server: {
            port: 3000,
        },
});
