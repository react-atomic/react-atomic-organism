import { FUNCTION, STRING } from "reshow-constant";

const keys = (o) => (null == o || STRING === typeof o ? [] : Object.keys(o));

const defaultCb = (t) => t + "";

const toArray = (maybeString) =>
  STRING === typeof maybeString ? [maybeString] : maybeString;

const keywordMatch = (haystack, needle, cb = defaultCb) =>
  keys(haystack).every((key) => {
    return (
      -1 !==
      cb(haystack[key]).toLowerCase().indexOf(cb(needle[key]).toLowerCase())
    );
  });

const exactMatch = (haystack, needle, cb = defaultCb) =>
  keys(haystack).every((key) => cb(haystack[key]) === cb(needle[key]));

const getHaystack = (haystack, keyArr) => {
  if (!keyArr.length) {
    return [haystack];
  } else {
    const results = {};
    keyArr.forEach((key) => (results[key] = haystack[key]));
    return results;
  }
};

const doFilter = ({ a, func, needle, cb }) =>
  func(getHaystack(a, keys(needle)), toArray(needle), cb);

const getFunc = (exact) =>
  exact ? (FUNCTION === typeof exact ? exact : exactMatch) : keywordMatch;

const arraySearchFirst = (arr, exact) => (needle, cb) => {
  const func = getFunc(exact);
  let result = false;
  (arr && arr.some ? arr : []).some(
    (a) => doFilter({ a, func, needle, cb }) && (() => result = a)()
  );
  return result;
};

const arraySearch = (arr, exact) => (needle, cb) => {
  const func = getFunc(exact);
  return (arr && arr.filter ? arr : []).filter((a) =>
    doFilter({ a, func, needle, cb })
  );
};

export default arraySearch;
export { arraySearchFirst };
