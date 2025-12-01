/**
 * @file bk-magic 替代实现
 */

export const messageError = (message, delay = 3000) => {
    console.error(`Error: ${message}`);
    setTimeout(() => {}, delay);
};

export const messageSuccess = (message, delay = 3000) => {
    console.log(`Success: ${message}`);
    setTimeout(() => {}, delay);
};

export const messageInfo = (message, delay = 3000) => {
    console.info(`Info: ${message}`);
    setTimeout(() => {}, delay);
};
