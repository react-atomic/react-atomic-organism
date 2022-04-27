import { UNDEFINED, IS_ARRAY } from "reshow-constant";
import callfunc from "call-func";
import getDefaultValue from "./getDefaultValue";

const getter = (o, k) => callfunc(o.get, [k]) || o[k];

const get = (o, path, defaultValue) => {
  if (null == o) {
    return getDefaultValue(defaultValue, o);
  }
  let current = o;
  if (!path || !IS_ARRAY(path)) {
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
