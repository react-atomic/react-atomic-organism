import { FUNCTION, UNDEFINED } from "reshow-constant";
const keys = Object.keys;
const isArray = Array.isArray;

const removeEmpty = (arr, undefinedOnly, excludeKey) => {
  if (!arr) {
    return arr;
  }
  if (undefinedOnly && FUNCTION !== typeof undefinedOnly) {
    undefinedOnly = (value) => UNDEFINED !== typeof value;
  }
  const result = {};
  keys(arr).forEach((key) => {
    const value = arr[key];
    if (excludeKey && excludeKey.length && -1 !== excludeKey.indexOf(key)) {
      return;
    }
    if (value || (undefinedOnly && undefinedOnly(value))) {
      result[key] = value;
    }
  });
  if (isArray(arr)) {
    return keys(result).map((key) => result[key]);
  } else {
    return result;
  }
};

export default removeEmpty;
