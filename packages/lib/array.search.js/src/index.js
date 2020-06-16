const defaultCb = t => t + "";

const keywordMatch = (haystack, needle, cb = defaultCb) =>
  -1 !==
  cb(haystack)
    .toLowerCase()
    .indexOf(cb(needle).toLowerCase());

const exactMatch = (haystack, needle, cb = defaultCb) =>
  cb(haystack) === cb(needle);

const getHaystack = (haystack, key) => (null == key ? haystack : haystack[key]);

const arraySearch = (arr, exact) => (key, value, cb) =>
  arr.filter(a =>
    exact
      ? exactMatch(getHaystack(a, key), value, cb)
      : keywordMatch(getHaystack(a, key), value, cb)
  );

export default arraySearch;
