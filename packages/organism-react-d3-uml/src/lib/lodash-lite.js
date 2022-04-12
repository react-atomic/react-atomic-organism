import get from "get-object-value";
import {
  UNDEFINED,
  FUNCTION,
  KEYS,
  IS_ARRAY,
  HAS as has,
  OBJ_SIZE as size,
} from "reshow-constant";
import { win } from "win-doc";
import dedup from "array.dedup";
import { getSN as uniqueId } from "get-random-id";

const isNotEmptyArray = (arr) => IS_ARRAY(arr) && arr.length;

const isEmpty = (v) => !v || !size(v);

const range = (n) => [...Array(n).keys()];

const rangeStep = (start, end, step, fromRight) => {
  let index = -1;
  let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
  const result = Array(length);

  while (length--) {
    result[fromRight ? length : ++index] = start;
    start += step;
  }
  return result;
};

const flattenDownDepth = (array, result, depth) => {
  depth--;

  for (let i = 0, j = array.length; i < j; i++) {
    const value = array[i];
    if (value) {
      if (depth > -1 && isNotEmptyArray(value)) {
        flattenDownDepth(value, result, depth);
      } else {
        result.push(value);
      }
    }
  }

  return result;
};

const minBy = (obj, func) => {
  const arrMin = {};
  const oKeys = KEYS(obj);
  oKeys.forEach((key) => {
    const v = func(obj[key], key);
    if (!isNaN(v)) {
      arrMin[key] = v;
    }
  });
  const thisMin = calMin(values(arrMin));
  let result = null;
  oKeys.some((key) => {
    if (thisMin === arrMin[key]) {
      result = obj[key];
      return true;
    } else {
      return false;
    }
  });
  return result;
};

const find = (obj, func) => {
  let result;
  KEYS(obj).some((key) => {
    if (func(obj[key], key)) {
      result = obj[key];
      return true;
    } else {
      return false;
    }
  });
  return result;
};

const pick = (obj, arr) => {
  const results = {};
  if (!size(obj)) {
    return results;
  }
  arr.forEach((key) => {
    if (has(obj, key)) {
      results[key] = obj[key];
    }
  });
  return results;
};

const mapValues = (obj, func) => {
  const results = {};
  KEYS(obj).forEach((key) => (results[key] = func(obj[key], key)));
  return results;
};

const zipObject = (a1, a2) => {
  const result = {};
  a1.forEach((a, k) => {
    result[a] = a2[k];
  });
  return result;
};

const now = () => win().Date.now();

const values = (obj) => obj && KEYS(obj).map((key) => obj[key]);

const calMax = (p1, ...other) =>
  isNotEmptyArray(p1) ? Math.max(...p1) : Math.max(p1, ...other);

const calMin = (p1, ...other) =>
  isNotEmptyArray(p1) ? Math.min(...p1) : Math.min(p1, ...other);

const isFunction = (func) => FUNCTION === typeof func;

const isUndefined = (val) => UNDEFINED === typeof val;

const constant = (v) => () => v;

const union = (...arr) => {
  let newArr = [];
  arr.forEach((a) => {
    newArr = [...newArr, ...a];
  });
  return dedup(newArr);
};

const transform = (obj, callback, result) => {
  KEYS(obj).forEach((key) => {
    const v = obj[key];
    callback(result, v);
  });
  return result;
};

export {
  size,
  constant,
  union,
  isEmpty,
  isUndefined,
  isFunction,
  transform,
  has,
  values,
  calMax,
  calMin,
  minBy,
  range,
  rangeStep,
  flattenDownDepth,
  find,
  pick,
  mapValues,
  uniqueId,
  zipObject,
  now,
};
