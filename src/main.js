/**
 * @file main entry
 * @author
 */
import { createApp } from "vue";

import App from "@/App";
import router from "@/router";
import store from "@/store";
import http, { injectCSRFTokenToHeaders } from "@/api";
import auth from "@/common/auth";
import Img403 from "@/images/403.png";
import Exception from "@/components/exception";
import { bus } from "@/common/bus";
import AuthComponent from "@/components/auth";
import bkui, {
    messageError,
    messageSuccess,
    messageInfo,
    messageWarn,
} from "@/common/bkmagic";

auth.requestCurrentUser().then(
    (user) => {
        injectCSRFTokenToHeaders();
        if (user.isAuthenticated) {
            global.bus = bus;
            const app = createApp(App);

            // 注册全局组件
            app.component("AppException", Exception);
            app.component("AppAuth", AuthComponent);

            // 使用插件
            app.use(router);
            app.use(store);
            app.use(bkui);

            // 添加全局属性
            app.config.globalProperties.$bus = bus;
            app.config.globalProperties.$http = http;
            app.config.globalProperties.messageError = messageError;
            app.config.globalProperties.messageSuccess = messageSuccess;
            app.config.globalProperties.messageInfo = messageInfo;
            app.config.globalProperties.messageWarn = messageWarn;

            global.mainComponent = app.mount("#app");
        } else {
            auth.redirectToLogin();
        }
    },
    (err) => {
        let message;
        if (err.status === 403) {
            message = "Sorry，您的权限不足!";
            if (err.data && err.data.msg) {
                message = err.data.msg;
            }
        } else {
            message = "无法连接到后端服务，请稍候再试。";
        }

        const divStyle =
            "" +
            "text-align: center;" +
            "width: 400px;" +
            "margin: auto;" +
            "position: absolute;" +
            "top: 50%;" +
            "left: 50%;" +
            "transform: translate(-50%, -50%);";

        const h2Style =
            "font-size: 20px;color: #979797; margin: 32px 0;font-weight: normal";

        const content =
            "" +
            `<div class="bk-exception bk-exception-center" style="${divStyle}">` +
            `<img src="${Img403}"><h2 class="exception-text" style="${h2Style}">${message}</h2>` +
            "</div>";

        document.write(content);
    }
);
