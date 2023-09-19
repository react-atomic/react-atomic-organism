//@ts-check

import { FUNCTION, T_UNDEFINED } from "reshow-constant";

/**
 * @typedef {{obj?: any, prev?: any, next?: any, nextIndex?: string | number, path?: any[] }} DefaultValueOption
 */

/**
 * @param {any} v
 * @param {DefaultValueOption} [options]
 * @returns {any}
 */
const getDefaultValue = (
  v,
  options = {
    obj: T_UNDEFINED,
    prev: T_UNDEFINED,
    next: T_UNDEFINED,
    nextIndex: T_UNDEFINED,
    path: [],
  }
) => (FUNCTION === typeof v ? v(options) : v ?? options?.next);
export default getDefaultValue;
