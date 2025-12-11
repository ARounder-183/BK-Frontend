/**
 * @file 引入 @blueking/bkui-vue 组件
 * @author
 */

import bkui from "./fully-import";
import { Message } from "bkui-vue";

// 按需引入
// import './demand-import'

let messageInstance = null;

export const messageError = (message, delay = 3000) => {
    messageInstance?.close?.();
    messageInstance = Message({
        message,
        delay,
        theme: "error",
    });
};

export const messageSuccess = (message, delay = 3000) => {
    messageInstance?.close?.();
    messageInstance = Message({
        message,
        delay,
        theme: "success",
    });
};

export const messageInfo = (message, delay = 3000) => {
    messageInstance?.close?.();
    messageInstance = Message({
        message,
        delay,
        theme: "primary",
    });
};

export const messageWarn = (message, delay = 3000) => {
    messageInstance?.close?.();
    messageInstance = Message({
        message,
        delay,
        theme: "warning",
        hasCloseIcon: true,
    });
};

export default bkui;
