import { DEFAULT, FUNCTION, UNDEFINED, KEYS, IS_ARRAY } from "reshow-constant";
import toArray from "with-array";

const getWebpack4Default = (o) =>
  get(o, [DEFAULT, DEFAULT], () => get(o, [DEFAULT], () => o));

const toJS = (v) => (v && v.toJS ? v.toJS() : v);

const toMap = (a, path) => {
  const next = get(a, path, {});
  const nextMap = {};
  KEYS(next).forEach((key) => (nextMap[key] = toJS(next[key])));
  return nextMap;
};

const toStringForOneArray = (arr) =>
  arr.length > 1 ? arr : arr[0] ?? undefined;

const initMap = (o) => (k, defaultValue) =>
  o[k] || (o[k] = getDefaultValue(defaultValue));

const getDefaultValue = (v, cur) => (FUNCTION === typeof v ? v(cur) : v ?? cur);

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
    while(i--) {
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
export {
  getWebpack4Default as getDefault,
  toJS,
  toMap,
  toArray,
  toStringForOneArray,
  initMap,
};
