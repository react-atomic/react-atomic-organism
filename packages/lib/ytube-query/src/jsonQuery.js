//@ts-check

import { JSONPath } from "jsonpath-plus";

/**
 * @param {any} json
 * @param {string} path
 */
export const jsonQuery = (json, path) => JSONPath({json, path, resultType: "value"});

/**
 * @param {any} json
 * @param {string} path
 */
export const firstItem = (json, path) => jsonQuery(json, path)[0];
