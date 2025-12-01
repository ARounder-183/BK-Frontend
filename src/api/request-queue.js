/**
 * @file 请求队列
 */

export default class RequestQueue {
    constructor() {
        this.queue = [];
    }

    get(id) {
        if (typeof id === "undefined") {
            return this.queue;
        }
        return this.queue.filter((request) => request.requestId === id);
    }

    set(newRequest) {
        this.queue.push(newRequest);
    }

    delete(id) {
        this.queue = this.queue.filter((request) => request.requestId !== id);
    }
}
