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

// all environments
app.use(
    history({
        rewrites: [
            {
                // connect-history-api-fallback 默认会对 url 中有 . 的 url 当成静态资源处理，
                // 但在蓝鲸里，saas 的 url 可能会出现格式为 /o/bk_iam.access/saas/xxx/ 的情况，
                // connect-history-api-fallback 会认为 bk_iam.access 是一个静态资源，从而在 express.static
                // 的处理中返回 404，所以这里需要排除这种情况
                from: /^\/o\/\w+\.\w+\/.*$/,
                to: (context) => context.parsedUrl.pathname,
            },
        ],
    })
);

// 静态资源服务
app.use(Express.static(path.join(__dirname, "..", "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}!\n`);
});
