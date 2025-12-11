/**
 * @file event bus
 * @author
 */

import mitt from "mitt";

// Use mitt for components communication in Vue 3
// see https://github.com/developit/mitt
export const bus = mitt();
