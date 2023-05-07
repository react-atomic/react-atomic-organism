//@ts-check

import { IS_ARRAY, NEW_OBJ, T_NULL, T_UNDEFINED } from "reshow-constant";

const esc = /[|\\{}()[\]^$+*?.]/g;
const pathEscReg = /[|{}()^$+]/g;
const bracketsEscReg = /[|\\{}()[\]^$+.]/g;

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
   * @returns {RegExp}
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
 * @returns {RegExpMatchArray}
 */
export const safeMatch = (testText, reg) => text(testText).match(reg);

/**
 * @typedef {object} RegInput
 * @property {RegExp} reg
 * @property {string[]} keys
 */

/**
 * @typedef {object} wildcardToRegExpOptional
 * @property {('bracketsEsc'|'')} [type=null]
 */

const pathCache = {
  "": NEW_OBJ(),
  bracketsEsc: NEW_OBJ(),
};
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
 * @param  {wildcardToRegExpOptional} wildcardOptional
 * @return {RegInput}
 */
export const wildcardToRegExp = (path, { type = "" } = {}) => {
  if (pathCache[type][path] == T_NULL) {
    const escReg = type === "bracketsEsc" ? bracketsEscReg : pathEscReg;
    const keys = [];
    const nextPath = (path || "")
      .replace(escReg, "\\$&")
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
      .replace(/\*/g, "(.*)")
      .replace(/<<\?>>/g, ".+");

    const regString = "^" + nextPath + "$";
    const reg = new RegExp(regString, "i");
    pathCache[type][path] = { reg, keys };
  }
  return pathCache[type][path];
};

/**
 * @param {string} testString
 * @param {string} path
 * @param  {wildcardToRegExpOptional} [wildcardOptional]
 * @returns {object|boolean}
 */
export const wildcardSearch = (testString, path, wildcardOptional) => {
  const pathToReg = wildcardToRegExp(path, wildcardOptional);
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
