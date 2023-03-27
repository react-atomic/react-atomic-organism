// @ts-check
import { FUNCTION, UNDEFINED } from "reshow-constant";
const keys = Object.keys;
const isArray = Array.isArray;

/**
 * @param {any} [arr]
 * @param {boolean|function(any):boolean} [undefinedOnly]
 * @param {any[]} [excludeKey]
 * @returns {any}
 */
const removeEmpty = (arr, undefinedOnly, excludeKey) => {
  if (!arr) {
    return arr;
  }
  if (undefinedOnly && FUNCTION !== typeof undefinedOnly) {
    undefinedOnly = (value) => UNDEFINED !== typeof value;
  }
  const result = {};
  keys(arr).forEach((key) => {
    const value = arr[key];
    if (excludeKey && excludeKey.length && -1 !== excludeKey.indexOf(key)) {
      return;
    }
    if (
      value ||
      (undefinedOnly && /** @type function*/ (undefinedOnly)(value))
    ) {
      result[key] = value;
    }
  });
  if (isArray(arr)) {
    return keys(result).map((key) => result[key]);
  } else {
    return result;
  }
};

export default removeEmpty;
