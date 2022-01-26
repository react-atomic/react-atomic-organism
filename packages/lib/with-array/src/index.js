import { IS_ARRAY, T_NULL, T_UNDEFINED, KEYS, STRING } from "reshow-constant";

const objectToArray = (obj) => KEYS(obj || {}).map((key) => obj[key]);

const arrayToObject = (arr, key) => {
  const map = {};
  if (IS_ARRAY(arr)) {
    let i = arr.length;
    while (i--) {
      const a = arr[i];
      map[a[key]] = a;
    }
  }
  return map;
};

const oneItemArrayToString = (maybeArray) => {
  if (IS_ARRAY(maybeArray)) {
    return maybeArray.length > 1 ? maybeArray : maybeArray[0];
  } else {
    return maybeArray;
  }
};

// contain null, undefined, numeric, string
const testString = (s) =>
  T_NULL == s || !isNaN(parseInt(s)) || STRING === typeof s;

const stringToArray = (maybeString) => anyToArray(maybeString, testString);

const anyToArray = (val, testFunc = (v) => !IS_ARRAY(v)) =>
  testFunc(val) ? (val === T_UNDEFINED ? [] : [val]) : val;

export default anyToArray;

export {
  oneItemArrayToString,
  objectToArray,
  arrayToObject,
  testString,
  stringToArray,
};
