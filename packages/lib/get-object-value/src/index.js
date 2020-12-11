import { DEFAULT, FUNCTION } from "reshow-constant";

const isArray = Array.isArray;
const keys = Object.keys;

const getWebpack4Default = (o) =>
  get(o, [DEFAULT, DEFAULT], () => get(o, [DEFAULT], () => o));

const toJS = (v) => (v && v.toJS ? v.toJS() : v);

const toMap = (a, path) => {
  const next = get(a, path, {});
  const nextMap = {};
  keys(next).forEach((key) => (nextMap[key] = toJS(next[key])));
  return nextMap;
};

const toArray = (maybeString) =>
  isArray(maybeString) ? maybeString : [maybeString];

const toStringForOneArray = (arr) =>
  arr.length > 1 ? arr : arr[0] ?? undefined;

const initMap = (o) => (k, defaultValue) =>
  o[k] || (o[k] = getDefaultValue(defaultValue));

const getDefaultValue = (v) => (FUNCTION === typeof v ? v() : v);

const get = (o, path, defaultValue) => {
  if (null == o) {
    return getDefaultValue(defaultValue);
  }
  let current = toJS(o);
  if (!path || !isArray(path)) {
    return current;
  }
  try {
    path.every((a) => {
      if (current.hasOwnProperty(a)) {
        current = current[a];
        return true;
      } else {
        current = getDefaultValue(defaultValue);
        return false;
      }
    });
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
