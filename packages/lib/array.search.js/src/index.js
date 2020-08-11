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

const arraySearch = (arr, exact) => (needle, cb) =>
  (arr && arr.filter ? arr : []).filter((a) => {
    if (FUNCTION === typeof exact) {
      return exact(getHaystack(a, keys(needle)), toArray(needle), cb);
    } else {
      return exact
        ? exactMatch(getHaystack(a, keys(needle)), toArray(needle), cb)
        : keywordMatch(getHaystack(a, keys(needle)), toArray(needle), cb);
    }
  });

export default arraySearch;
