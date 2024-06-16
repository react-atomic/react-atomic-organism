// @ts-check

import {
  FUNCTION,
  STRING,
  KEYS,
  T_NULL,
  T_FALSE,
  IS_ARRAY,
} from "reshow-constant";
import { stringToArray, testString } from "with-array";

// avoid Object.keys("foo") --->> ["0", "1", "2"]
/**
 * @param {any} o
 */
const keys = (o) => (T_NULL == o || STRING === typeof o ? [] : KEYS(o));

/**
 * @param {any} t
 * @param {any} [_payload]
 */
const defaultCb = (t, _payload) => t + "";

const HAYSTACK = "haystack";

const NEEDLE = "needle";

/**
 * @param {any} haystack
 * @param {any} needle
 */
const getHaystack = (haystack, needle) =>
  testString(needle) ? [haystack] : haystack;

/**
 * @param {any} haystack
 * @param {any} needle
 */
const keywordMatch = (haystack, needle) =>
  -1 !== haystack.toLowerCase().indexOf(needle.toLowerCase());

/**
 * @param {any} haystack
 * @param {any} needle
 */
const exactMatch = (haystack, needle) => haystack === needle;

const doFilter = ({ a, matchFunc, needle, cb = defaultCb }) => {
  const thisNeedle = stringToArray(needle);
  const thisHaystack = getHaystack(a, needle);
  const thisNeedleKeys = keys(thisNeedle);
  return (
    thisNeedleKeys &&
    thisNeedleKeys.length &&
    thisNeedleKeys.every((key) =>
      matchFunc(
        cb(thisHaystack[key], {
          thisHaystack,
          thisNeedle,
          key,
          type: HAYSTACK,
        }),
        cb(thisNeedle[key], {
          thisHaystack,
          thisNeedle,
          key,
          type: NEEDLE,
        })
      )
    )
  );
};

/**
 * @param {any} exact
 * @returns {Function}
 */
const getMatchFunc = (exact) =>
  exact ? (FUNCTION === typeof exact ? exact : exactMatch) : keywordMatch;

/**
 * @callback KeywordCallback
 * @param {any} needle
 * @param {any} [cb]
 */

/**
 * @param {any[]} [arr]
 * @param {any} [exact]
 * @returns {KeywordCallback}
 */
const arraySearchFirst = (arr, exact) => (needle, cb) => {
  const matchFunc = getMatchFunc(exact);
  let result = T_FALSE;
  (IS_ARRAY(arr) ? arr : []).some(
    (a) => doFilter({ a, matchFunc, needle, cb }) && (result = a)
  );
  return result;
};

/**
 * @param {any[]} [arr]
 * @param {any} [exact]
 * @returns {KeywordCallback}
 */
const arraySearchLast = (arr, exact) => (needle, cb) => {
  const matchFunc = getMatchFunc(exact);
  let result = T_FALSE;
  if (IS_ARRAY(arr)) {
    let i = arr.length;
    while (i--) {
      if (doFilter({ a: arr[i], matchFunc, needle, cb })) {
        result = arr[i];
        break;
      }
    }
  }
  return result;
};

/**
 * @param {any[]} [arr]
 * @param {any} [exact]
 * @returns {KeywordCallback}
 */
const arraySearch = (arr, exact) => (needle, cb) => {
  const matchFunc = getMatchFunc(exact);
  return (IS_ARRAY(arr) ? arr : []).filter((a) =>
    doFilter({ a, matchFunc, needle, cb })
  );
};

export default arraySearch;
export { arraySearchFirst, arraySearchLast };
