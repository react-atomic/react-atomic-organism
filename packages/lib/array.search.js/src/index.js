import { FUNCTION, STRING } from "reshow-constant";

const keys = (o) => (null == o || STRING === typeof o ? [] : Object.keys(o));

const defaultCb = (t) => t + "";

const toArray = (maybeString) =>
  STRING === typeof maybeString ? [maybeString] : maybeString;

const getHaystack = (haystack, keyArr) =>
  !keyArr.length ? [haystack] : haystack;

const keywordMatch = (haystack, needle) =>
  -1 !== haystack.toLowerCase().indexOf(needle.toLowerCase());

const exactMatch = (haystack, needle) => haystack === needle;

const doFilter = ({ a, func, needle, cb = defaultCb }) => {
  const thisNeedle = toArray(needle);
  const thisHaystack = getHaystack(a, keys(needle));
  return keys(thisNeedle).every((key) =>
    func(cb(thisHaystack[key]), cb(thisNeedle[key]))
  );
};

const getFunc = (exact) =>
  exact ? (FUNCTION === typeof exact ? exact : exactMatch) : keywordMatch;

const arraySearchFirst = (arr, exact) => (needle, cb) => {
  const func = getFunc(exact);
  let result = false;
  (arr && arr.some ? arr : []).some(
    (a) => doFilter({ a, func, needle, cb }) && (() => (result = a))()
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
