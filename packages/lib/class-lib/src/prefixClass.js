//@ts-check

import { strToArray } from "./strToArray";

/**
 * @param {string} prefix
 * @param {string} className
 * @returns {string}
 */
const prefixClass = (prefix, className) => {
  const classes = strToArray(className);
  return classes.map((c) => prefix + c).join(" ");
};

export default prefixClass;
