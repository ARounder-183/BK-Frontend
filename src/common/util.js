/**
 * @file 通用方法
 */

export function curry(fn) {
    const judge = (...args) =>
        args.length === fn.length ? fn(...args) : (arg) => judge(...args, arg);
    return judge;
}

export function isObject(obj) {
    return obj !== null && typeof obj === "object";
}

export function normalizeParams(type, payload) {
    if (typeof type === "string") {
        return { type, payload };
    }
    return type;
}
