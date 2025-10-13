// @ts-check

import get from "get-object-value";

// String.replace() resets lastIndex, so it's safe to use a global regex here.
const tagReg = /(\{\{)([^\}]*)(\}\})/g;

/**
 * @param {string} s
 * @param {{[key: string]: any}} payload
 * @returns {string}
 */
const tpl = (s, payload) => {
  const result = s.replace(tagReg, (...m) => get(payload, [m[2]]));
  return result;
};

export default tpl;
