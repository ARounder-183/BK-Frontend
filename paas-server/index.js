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
    SITE_URL: process.env.SITE_URL || "",
    BK_STATIC_URL: process.env.BK_STATIC_URL || "",
    // 当前应用的环境，预发布环境为 stag，正式环境为 prod
    BKPAAS_ENVIRONMENT: process.env.BKPAAS_ENVIRONMENT || "",
    // EngineApp名称，拼接规则：bkapp-{appcode}-{BKPAAS_ENVIRONMENT}
    BKPAAS_ENGINE_APP_NAME: process.env.BKPAAS_ENGINE_APP_NAME || "",
    // 内部版对应ieod，外部版对应tencent，混合云版对应clouds
    BKPAAS_ENGINE_REGION: process.env.BKPAAS_ENGINE_REGION || "",
    // APP CODE
    BKPAAS_APP_ID: process.env.BKPAAS_APP_ID || "",
    BKPAAS_APP_SECRET: process.env.BKPAAS_APP_SECRET || "",
    BK_LOGIN_URL: process.env.BK_LOGIN_URL || "",
};
