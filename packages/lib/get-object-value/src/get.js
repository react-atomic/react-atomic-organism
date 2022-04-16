import {  UNDEFINED, IS_ARRAY } from "reshow-constant";
import getDefaultValue from "./getDefaultValue";
import toJS from "./toJS";

const get = (o, path, defaultValue) => {
  if (null == o) {
    return getDefaultValue(defaultValue, o);
  }
  let current = toJS(o);
  if (!path || !IS_ARRAY(path)) {
    return current;
  }
  try {
    let i = path.length;
    const j = path.length - 1;
    while (i--) {
      const index = path[j - i];
      if (current && UNDEFINED !== typeof current[index]) {
        current = current[index];
        if (null == current) {
          current = getDefaultValue(defaultValue, current);
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
