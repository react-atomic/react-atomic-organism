import getDefaultValue from "./getDefaultValue";

/**
 * Why need initMap?
 * const o = {};
 *
 * Before:
 * if (!o["foo"]) { // <-- u need do it, before every set.
 *  o["foo"] = [];
 * } 
 * o.foo.push('bar');
 *
 * After:
 * initMap(o)("foo", []).push('bar');
 */
const initMap = (o) => (k, defaultValue) =>
  o[k] || (o[k] = getDefaultValue(defaultValue));

export default initMap;
