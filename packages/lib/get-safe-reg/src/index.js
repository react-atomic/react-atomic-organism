//@ts-check

import { IS_ARRAY, NEW_OBJ, T_NULL, T_UNDEFINED } from "reshow-constant";

// SECURITY: Configuration for ReDoS protection
const SECURITY_LIMITS = {
  MAX_PATTERN_LENGTH: 8192,
  MAX_WILDCARDS: 20,
  MAX_PARAMETERS: 50,
};

/**
 * @param {any} txt
 * @returns {string}
 */
const text = (txt) => (txt ? txt + "" : "");

/**
 * @param {string} regString
 */
const getSafeReg = (regString) =>
  text(regString).replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");

// SECURITY: Input validation function
/**
 * @param {string} path
 */
const validateInput = (path) => {
  if (!path) return "";

  const pathStr = text(path);

  // Check pattern length
  if (pathStr.length > SECURITY_LIMITS.MAX_PATTERN_LENGTH) {
    throw new Error(
      `Pattern length ${pathStr.length} exceeds limit ${SECURITY_LIMITS.MAX_PATTERN_LENGTH}`
    );
  }

  // Check wildcard count
  const wildcardCount = (pathStr.match(/\*/g) || []).length;
  if (wildcardCount > SECURITY_LIMITS.MAX_WILDCARDS) {
    throw new Error(
      `Wildcard count ${wildcardCount} exceeds limit ${SECURITY_LIMITS.MAX_WILDCARDS}`
    );
  }

  // Check parameter count
  const paramCount = (pathStr.match(/:\w+/g) || []).length;
  if (paramCount > SECURITY_LIMITS.MAX_PARAMETERS) {
    throw new Error(
      `Parameter count ${paramCount} exceeds limit ${SECURITY_LIMITS.MAX_PARAMETERS}`
    );
  }

  return pathStr;
};

/**
 * @param {object} cache
 */
export const cacheReg =
  (cache) =>
  /**
   * @param {CallableFunction} [getRegCallback]
   * @param {string} [flags]
   */
  (getRegCallback, flags) =>
  /**
   * @param {string} regString
   * @returns {RegExp}
   */
  (regString) => {
    // SECURITY: Validate input
    const validatedString = validateInput(regString);

    if (!cache[validatedString]) {
      const cookRegString = getRegCallback
        ? getRegCallback(validatedString)
        : validatedString;
      cache[validatedString] = new RegExp(cookRegString, flags);
    }
    return cache[validatedString];
  };

/**
 * @param {string} testText
 * @param {RegExp} reg
 * @returns {RegExpMatchArray|null}
 */
export const safeMatch = (testText, reg) => {
  // SECURITY: Input length check
  const textStr = text(testText);
  if (textStr.length > SECURITY_LIMITS.MAX_PATTERN_LENGTH) {
    console.warn(
      `Input text length ${textStr.length} may cause performance issues`
    );
  }

  return textStr.match(reg);
};

/**
 * @typedef {object} RegInput
 * @property {RegExp} reg
 * @property {string[]} keys
 */

/**
 * @typedef {"brackets"|"path"|"config"} EscapeType
 */

/**
 * @typedef {object} wildcardToRegExpOptional
 * @property {EscapeType} [escape]
 */

/**
 * @type {Record<EscapeType, Record<string, RegInput>>}
 */
const pathCache = {
  brackets: NEW_OBJ(),
  path: NEW_OBJ(),
  config: NEW_OBJ(),
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
export const wildcardToRegExp = (path, { escape = "path" } = {}) => {
  // SECURITY: Validate input first
  const validatedPath = validateInput(path);
  const pathEscReg = /[|{}()^$+]/g;
  const configEscReg = /[{}[\]^$+.]/g;
  const bracketsEscReg = /[|\\{}()[\]^$+.]/g;

  if (pathCache[escape][validatedPath] == T_NULL) {
    let escReg;
    switch (escape) {
      case "brackets":
        escReg = bracketsEscReg;
        break;
      case "config":
        escReg = configEscReg;
        break;
      case "path":
      default:
        escReg = pathEscReg;
        break;
    }
    const keys = [];
    const nextPath = (validatedPath || "")
      .replace(escReg, "\\$&")
      .replace(/\?/g, "<<?>>")
      .concat("/?")
      .replace(/\/\(/g, "(?:/")
      .replace(
        // SECURITY FIX: Use character class instead of lazy quantifier to prevent ReDoS
        // Changed (?:(\(.*?\)))? to (?:(\([^)]*\)))?
        // This prevents catastrophic backtracking by using a more specific character class
        /(\/)?(\.)?:(\w+)(?:(\([^)]*\)))?(\?)?|\*/g,
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

    // SECURITY: Wrap regex creation in try-catch
    try {
      const reg = new RegExp(regString, "i");
      pathCache[escape][validatedPath] = { reg, keys };
    } catch (error) {
      console.warn("Failed to create regex for pattern:", validatedPath, error);
      // Fallback to a simple exact match
      const fallbackReg = new RegExp(
        "^" + validatedPath.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "$",
        "i"
      );
      pathCache[escape][validatedPath] = { reg: fallbackReg, keys: [] };
    }
  }
  return pathCache[escape][validatedPath];
};

/**
 * @param {string} testString
 * @param {string} path
 * @param  {wildcardToRegExpOptional} [wildcardOptional]
 * @returns { Record<string, any> | boolean }
 */
export const wildcardSearch = (testString, path, wildcardOptional) => {
  // SECURITY: Validate inputs
  const validatedTestString = text(testString);
  const validatedPath = validateInput(path);

  if (validatedTestString.length > SECURITY_LIMITS.MAX_PATTERN_LENGTH) {
    console.warn("Large input string may cause performance issues");
  }

  const pathToReg = wildcardToRegExp(validatedPath, wildcardOptional);
  const o = validatedTestString.match(pathToReg.reg);
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
