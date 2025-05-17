//@ts-check

import { IS_ARRAY, T_UNDEFINED, FUNCTION } from "reshow-constant";
import callfunc from "call-func";
import getDefaultValue from "./getDefaultValue";

/**
 * Explain:
 * 1. 'o' will always have a value check performed when [null != current].
 * 2. Call 'o.get' only when it is a function.
 *
 * @see https://github.com/react-atomic/reshow/issues/123
 * @param {object} o
 * @param {string|number} k
 * @returns {any}
 */
const getter = (o, k) => {
  if (typeof o.get === FUNCTION) {
    return callfunc(o.get, [k], o);
  } else {
    return o[k];
  }
};

/**
 * @param {any} o
 * @param {(string|number)[]=} path
 * @param {any=} defaultValue
 * @returns {any}
 */
const get = (o, path = [], defaultValue = T_UNDEFINED) => {
  if (null == o) {
    return getDefaultValue(defaultValue, { obj: o });
  }
  let current = o;
  if (!path || (IS_ARRAY(path) && !path.length)) {
    return current;
  }
  if (!IS_ARRAY(path)) {
    throw new TypeError(`path should be array, but got ${path}`);
  }
  try {
    let i = path.length;
    const j = path.length - 1;
    while (i--) {
      const index = path[j - i];
      if (null != current) {
        const next = getter(current, /** @type any*/ (index));
        if (null != next) {
          current = next;
        } else {
          current = getDefaultValue(defaultValue, {
            obj: o,
            prev: current,
            next,
            nextIndex: index,
            path,
          });
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
