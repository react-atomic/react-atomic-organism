import { FUNCTION, STRING, KEYS, T_NULL, T_FALSE } from "reshow-constant";
import { stringToArray, testString } from "with-array";

// avoid Object.keys("foo") --->> ["0", "1", "2"]
const keys = (o) => (T_NULL == o || STRING === typeof o ? [] : KEYS(o));

const defaultCb = (t) => t + "";

const HAYSTACK = "haystack";

const NEEDLE = "needle";

const getHaystack = (haystack, needle) =>
  testString(needle) ? [haystack] : haystack;

const keywordMatch = (haystack, needle) =>
  -1 !== haystack.toLowerCase().indexOf(needle.toLowerCase());

const exactMatch = (haystack, needle) => haystack === needle;

const doFilter = ({ a, matchFunc, needle, cb = defaultCb }) => {
  const thisNeedle = stringToArray(needle);
  const thisHaystack = getHaystack(a, needle);
  const thisNeedleKeys = keys(thisNeedle);
  return (
    thisNeedleKeys &&
    thisNeedleKeys.length &&
    thisNeedleKeys.every((key) =>
      matchFunc(
        cb(thisHaystack[key], {
          thisHaystack,
          thisNeedle,
          key,
          type: HAYSTACK,
        }),
        cb(thisNeedle[key], {
          thisHaystack,
          thisNeedle,
          key,
          type: NEEDLE,
        })
      )
    )
  );
};

const getMatchFunc = (exact) =>
  exact ? (FUNCTION === typeof exact ? exact : exactMatch) : keywordMatch;

const arraySearchFirst = (arr, exact) => (needle, cb) => {
  const matchFunc = getMatchFunc(exact);
  let result = T_FALSE;
  (arr && arr.some ? arr : []).some(
    (a) => doFilter({ a, matchFunc, needle, cb }) && (() => (result = a))()
  );
  return result;
};

const arraySearch = (arr, exact) => (needle, cb) => {
  const matchFunc = getMatchFunc(exact);
  return (arr && arr.filter ? arr : []).filter((a) =>
    doFilter({ a, matchFunc, needle, cb })
  );
};

export default arraySearch;
export { arraySearchFirst };
