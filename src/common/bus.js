/**
 * @file event bus 替代实现
 */

import { EventEmitter } from "events";

const bus = new EventEmitter();

export default bus;
