// @ts-check
import { IS_ARRAY, T_NULL, T_UNDEFINED, KEYS, STRING } from "reshow-constant";

const objectToArray = (/**@type any*/ obj) =>
  KEYS(obj || {}).map((key) => obj[key]);

/**
 * @param {any[]} arr
 * @param {string} key
 */
const arrayToObject = (arr, key) => {
  const map = {};
  if (IS_ARRAY(arr)) {
    let i = arr.length;
    while (i--) {
      const a = arr[i];
      map[a[key]] = a;
    }
  }
  return map;
};

/**
 * @typedef {import("reshow-constant").SAFE_UNDEFINED} SAFE_UNDEFINED
 */

/**
 * @param {any[]|string|number|SAFE_UNDEFINED} maybeArray
 */
const oneItemArrayToString = (maybeArray) => {
  if (IS_ARRAY(maybeArray)) {
    return maybeArray.length > 1 ? maybeArray : maybeArray[0];
  } else {
    return maybeArray;
  }
};

/**
 * Contain null, undefined, numeric, string
 * @param {any} s
 */
const testString = (s) =>
  T_NULL == s || !isNaN(parseInt(s)) || STRING === typeof s;

/**
 * @param {string|number} maybeString
 */
const stringToArray = (maybeString) => anyToArray(maybeString, testString);

/**
 * @param {any} val
 * @param {Function} testFunc
 * @returns {any[]}
 */
const anyToArray = (val, testFunc) => {
  testFunc = testFunc || ((/**@type any*/ v) => !IS_ARRAY(v));
  return testFunc(val) ? (val === T_UNDEFINED ? [] : [val]) : val;
};

export default anyToArray;

export {
  oneItemArrayToString,
  objectToArray,
  arrayToObject,
  testString,
  stringToArray,
};
