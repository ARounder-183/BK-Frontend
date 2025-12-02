// 在所有代码之前加载环境变量
require("dotenv").config({
    path: `.bk.${process.env.NODE_ENV || "development"}.env`,
});

/**
 * @file prod server
 * 静态资源
 * 模块渲染输出
 * 注入全局变量
 * 添加html模板引擎
 */
const Express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const history = require("connect-history-api-fallback");
const user = require("./middleware/user");
const artTemplate = require("express-art-template");

const mockTable = require("./api/table");

const app = new Express();

const PORT = process.env.PORT || 5000;

/** 仅解决空模板直接部署时，模拟的接口，防止直接部署接口404，实际项目可删除 */
mockTable(app);

app.use(cookieParser());
app.use(user);

// 注入全局变量
const GLOBAL_VAR = {
    SITE_URL: process.env.BK_SITE_URL || "",
    BK_STATIC_URL: process.env.BK_STATIC_URL || "",
    // 当前应用的环境，预发布环境为 stag，正式环境为 prod
    BKPAAS_ENVIRONMENT: process.env.BK_PAAS_ENVIRONMENT || "",
    // EngineApp名称，拼接规则：bkapp-{appcode}-{BKPAAS_ENVIRONMENT}
    BKPAAS_ENGINE_APP_NAME: process.env.BK_PAAS_ENGINE_APP_NAME || "",
    // 内部版对应ieod，外部版对应tencent，混合云版对应clouds
    BKPAAS_ENGINE_REGION: process.env.BK_PAAS_ENGINE_REGION || "",
    // APP CODE
    BKPAAS_APP_ID: process.env.BK_PAAS_APP_ID || "",
    BKPAAS_APP_SECRET: process.env.BK_PAAS_APP_SECRET || "",
    BK_LOGIN_URL: process.env.BK_LOGIN_URL || "",
};

// 打印读取到的环境变量
console.log("Reading environment variables:", GLOBAL_VAR);

// 静态资源服务
// 使用 BK_SITE_URL 作为虚拟路径前缀，以正确提供静态文件
app.use(
    process.env.BK_SITE_URL,
    Express.static(path.join(__dirname, "..", "build"))
);

const buildDir = path.resolve(__dirname, "..", "build");

app.use(
    history({
        index: "/",
        rewrites: [
            {
                from: /\/(\d+\.)*\d+$/,
                to: "/",
            },
            {
                from: /\/\/+.*\..*\//,
                to: "/",
            },
        ],
    })
);

/**
 * 首页
 */
app.get("/", (req, res) => {
    const scriptName = (req.headers["x-script-name"] || "").replace(/\//g, "");
    if (scriptName) {
        GLOBAL_VAR.BK_STATIC_URL = `/${scriptName}`;
        GLOBAL_VAR.SITE_URL = `/${scriptName}`;
    } else {
        GLOBAL_VAR.BK_STATIC_URL = "";
        GLOBAL_VAR.SITE_URL = "";
    }
    res.render(path.join(buildDir, "index.html"), GLOBAL_VAR);
});

app.use("/static", Express.static(path.join(buildDir, "static")));
app.set("views", buildDir);
app.engine("html", artTemplate);
app.set("view engine", "html");

app.listen(PORT, () => {
    console.log(`App is running in port ${PORT}`);
});
