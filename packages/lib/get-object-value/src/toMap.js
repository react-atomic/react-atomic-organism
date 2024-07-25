// @ts-check
import { KEYS, NEW_OBJ } from "reshow-constant";
import get from "./get";
import toJS from "./toJS";

/**
 * @param {any} maybeMap
 * @param {function} cb
 */
export const forEachMap = (maybeMap, cb) => {
  if (maybeMap.forEach) {
    maybeMap.forEach(cb);
  } else {
    KEYS(maybeMap).forEach((k) => cb(maybeMap[k], k));
  }
};

/**
 * @param {any} maybeMap
 * @param {any} k
 * @param {any} v
 */
export const setMap = (maybeMap, k, v) => {
  if (maybeMap.set) {
    return maybeMap.set(k, v);
  } else {
    maybeMap[k] = v;
  }
};

/**
 * @param {any} a
 * @param {any[]=} path
 * @returns {any}
 */
const toMap = (a, path) => {
  const next = get(a, path, NEW_OBJ());
  const nextMap = NEW_OBJ();
  forEachMap(
    next,
    /**
     * @param {any} v
     * @param {number} k
     */
    (v, k) => (nextMap[k] = toJS(v))
  );
  return nextMap;
};

export default toMap;
