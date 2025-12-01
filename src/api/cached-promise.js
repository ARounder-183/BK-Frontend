/**
 * @file promise 缓存
 */

export default class CachedPromise {
    constructor() {
        this.cache = {};
    }

    get(id) {
        if (typeof id === "undefined") {
            return Object.keys(this.cache).map(
                (requestId) => this.cache[requestId]
            );
        }
        return this.cache[id];
    }

    set(id, promise) {
        Object.assign(this.cache, { [id]: promise });
    }

    delete(deleteIds) {
        if (typeof deleteIds === "undefined") {
            this.cache = {};
        } else {
            [].concat(deleteIds).forEach((id) => delete this.cache[id]);
        }
    }
}
