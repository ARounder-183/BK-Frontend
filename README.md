# React SPA

This is a React-based single-page application.

## 本地开发
1. 新建 `.env` 文件，配置开发环境变量。
2. 运行 `npm run dev` 启动开发服务器。
3. 打开浏览器访问 `http://localhost:3000/`。

## 生产构建
运行以下命令进行生产构建：
```bash
npm run build
```

## 项目结构
- `mock-server/`：Mock 服务目录。
- `paas-server/`：Express Web 服务目录。
- `src/`：React 应用的源码目录。
- `static/`：存放不参与打包的静态资源。

## 注意事项
- 确保 Node.js 版本符合 `package.json` 中的 `engines` 要求。
- 使用 Vite 作为构建工具，配置文件为 `vite.config.js`。