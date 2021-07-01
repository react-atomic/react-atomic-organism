import { FUNCTION, STRING } from "reshow-constant";
import shouldBeString from "./shouldBeString";
import toArray from "./toArray";

// avoid Object.keys("foo") => ["0", "1", "2"]
const keys = (o) => (null == o || STRING === typeof o ? [] : Object.keys(o));

const defaultCb = (t) => t + "";

const getHaystack = (haystack, needle) =>
  shouldBeString(needle) ? [haystack] : haystack;

const keywordMatch = (haystack, needle) => {
  return -1 !== haystack.toLowerCase().indexOf(needle.toLowerCase());
};

const exactMatch = (haystack, needle) => {
  return haystack === needle;
};

const doFilter = ({ a, func, needle, cb = defaultCb }) => {
  const thisNeedle = toArray(needle);
  const thisHaystack = getHaystack(a, needle);
  const thisNeedleKeys = keys(thisNeedle);
  return (
    thisNeedleKeys &&
    thisNeedleKeys.length &&
    thisNeedleKeys.every((key) =>
      func(
        cb(thisHaystack[key], {
          thisHaystack,
          thisNeedle,
          key,
          type: "haystack",
        }),
        cb(thisNeedle[key], {
          thisHaystack,
          thisNeedle,
          key,
          type: "needle",
        })
      )
    )
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
