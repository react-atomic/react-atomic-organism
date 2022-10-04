//@ts-check

import { UNDEFINED, IS_ARRAY, T_UNDEFINED } from "reshow-constant";
import callfunc from "call-func";
import getDefaultValue from "./getDefaultValue";

/**
 * @see https://github.com/react-atomic/reshow/issues/123
 * @param {object} o
 * @param {string} k
 * @returns {any}
 */
const getter = (o, k) => (o.size && callfunc(o.get, [k], o)) ?? o[k];

/**
 * @param {any} o
 * @param {string[]} path 
 * @param {any} defaultValue
 * @returns {any}
 */
const get = (o, path = [], defaultValue = T_UNDEFINED) => {
  if (null == o) {
    return getDefaultValue(defaultValue, o);
  }
  let current = o;
  if (!path || !IS_ARRAY(path) || !path.length) {
    return current;
  }
  try {
    let i = path.length;
    const j = path.length - 1;
    while (i--) {
      const index = path[j - i];
      if (null != current) {
        const next = getter(current, index);
        if (UNDEFINED !== typeof next) {
          current = next;
        } else {
          current = getDefaultValue(defaultValue, next);
          break;
        }
      } else {
        current = getDefaultValue(defaultValue);
        break;
      }
    }
  } catch (e) {
    console.warn({ e });
    current = getDefaultValue(defaultValue);
  }
  return current;
};
export default get;
