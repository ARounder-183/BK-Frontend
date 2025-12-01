/**
 * @file axios 封装
 */

import axios from "axios";
import CachedPromise from "./cached-promise";
import RequestQueue from "./request-queue";

// axios 实例
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: { "X-REQUESTED-WITH": "XMLHttpRequest" },
});

const http = {
    queue: new RequestQueue(),
    cache: new CachedPromise(),
    cancelRequest: (requestId) => http.queue.delete(requestId),
    cancelCache: (requestId) => http.cache.delete(requestId),
    cancel: (requestId) =>
        Promise.all([
            http.cancelRequest(requestId),
            http.cancelCache(requestId),
        ]),
};

const methodsWithoutData = ["delete", "get", "head", "options"];
const methodsWithData = ["post", "put", "patch"];
const allMethods = [...methodsWithoutData, ...methodsWithData];

allMethods.forEach((method) => {
    http[method] = (url, data, config) => {
        const requestConfig = { ...config, method, url };
        if (methodsWithData.includes(method)) {
            requestConfig.data = data;
        }
        return axiosInstance(requestConfig);
    };
});

export default http;
