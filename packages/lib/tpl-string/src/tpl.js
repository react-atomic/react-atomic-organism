// @ts-check

import get from "get-object-value";

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
