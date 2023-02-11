//@ts-check

import { IS_ARRAY, T_NULL, T_UNDEFINED } from "reshow-constant";

const esc = /[|\\{}()[\]^$+*?.]/g;
const pathEsc = /[|\\{}()[\]^$+]/g;

/**
 * @param {any} txt
 * @returns {string}
 */
const text = (txt) => (txt ? txt + "" : "");

/**
 * @param {string} regString
 */
const getSafeReg = (regString) => text(regString).replace(esc, "\\$&");

/**
 * @param {object} cache
 */
export const cacheReg =
  (cache) =>
  /**
   * @param {CallableFunction} getRegCallback
   * @param {string} flags
   */
  (getRegCallback = T_UNDEFINED, flags = T_UNDEFINED) =>
  /**
   * @param {string} regString
   */
  (regString) => {
    if (!cache[regString]) {
      const cookRegString = getRegCallback
        ? getRegCallback(regString)
        : regString;
      cache[regString] = new RegExp(cookRegString, flags);
    }
    return cache[regString];
  };

/**
 * @param {string} testText
 * @param {RegExp} reg
 * @returns {object}
 */
export const safeMatch = (testText, reg) => text(testText).match(reg);

/**
 * @typedef {object} RegInput
 * @property {RegExp} reg
 * @property {string[]} keys
 */

const pathCache = {};
/**
 * Normalize the given path string,
 * returning a regular expression.
 *
 * An empty array should be passed,
 * which will contain the placeholder
 * key names.
 * For example "/user/:id" will contain ["id"].
 *
 * @param  {string} path
 * @return {RegInput}
 */
export const pathToRegExp = (path) => {
  if (pathCache[path] != T_NULL) {
    return pathCache[path];
  }
  const keys = [];
  const nextPath = (path || "")
    .replace(pathEsc, "\\$&")
    .replace(/\?/g, "<<?>>")
    .concat("/?")
    .replace(/\/\(/g, "(?:/")
    .replace(
      /(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?|\*/g,
      (_, slash, format, key, capture, optional) => {
        if (_ === "*") {
          keys && keys.push(T_UNDEFINED);
          return _;
        }
        keys && keys.push(key);
        slash = slash || "";
        return (
          "" +
          (optional ? "" : slash) +
          "(?:" +
          (optional ? slash : "") +
          (format || "") +
          (capture || "([^/]+?)") +
          ")" +
          (optional || "")
        );
      }
    )
    .replace(/([\/.])/g, "\\$1")
    .replace(/\*/g, "(.*)")
    .replace(/<<\?>>/g, ".+");

  const regString = "^" + nextPath + "$";
  const reg = new RegExp(regString, "i");
  pathCache[path] = { reg, keys };
  return pathCache[path];
};

/**
 * @param {string} testString
 * @param {string} path
 * @returns {object|boolean}
 */
export const searchRegPath = (testString, path) => {
  const pathToReg = pathToRegExp(path);
  const o = testString.match(pathToReg.reg);
  if (o && pathToReg.keys.length) {
    const arr = {};
    pathToReg.keys.forEach((key, index) => {
      if (arr[key]) {
        if (!IS_ARRAY(arr[key])) {
          arr[key] = [arr[key]];
        }
        arr[key].push(o[index + 1]);
      } else {
        arr[key] = o[index + 1];
      }
    });
    return arr;
  } else {
    return o ? true : false;
  }
};

export default getSafeReg;
