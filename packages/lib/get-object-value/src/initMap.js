import getDefaultValue from "./getDefaultValue";

/**
 * Why need initMap?
 * const o = {};
 *
 * Before:
 * if (!o[k]) { // <-- u need do it, before every set.
 *  o[k] = {x:[], y:[]};
 * } 
 * o.k.x.push('z');
 *
 * After:
 * initMap(o)(k, {x:[], y:[]});
 * o.k.x.push('z');
 */
const initMap = (o) => (k, defaultValue) =>
  o[k] || (o[k] = getDefaultValue(defaultValue));

export default initMap;
