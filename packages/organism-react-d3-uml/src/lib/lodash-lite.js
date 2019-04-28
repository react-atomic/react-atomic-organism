import get from 'get-object-value';
import {UNDEFINED, FUNCTION} from 'reshow-constant';
import {win} from 'win-doc';
import dedup from 'array.dedup';

const keys = Object.keys;
const isArray = Array.isArray;
const isEmptyArray = arr => isArray(arr) && arr.length;

const isEmptyObj = obj => !obj || !keys(obj).length;

const isEmpty = v => !v || isEmptyArray(v) || isEmptyObj(v) 

const range = n => [...Array(n).keys()];

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

    if (depth > -1 && isEmptyArray(value)) {
      flattenDownDepth(value, result, depth);
    } else {
      result.push(value);
    }
  }

  return result;
};

const minBy = (obj, func) => {
  const arrMin = {};
  const oKeys = keys(obj);
  oKeys.forEach(key => {
    const v = func(obj[key], key);
    if (!isNaN(v)) {
      arrMin[key] = v;
    }
  });
  const thisMin = min(values(arrMin));
  let result = null;
  oKeys.some(key => {
    if (arrMin[key] && thisMin === arrMin[key]) {
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
  keys(obj).some(key => {
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
  const oKeys = keys(obj);
  if (!oKeys || !oKeys.length) {
    return results;
  }
  arr.forEach(key => {
    if (has(obj, key)) {
      results[key] = obj[key];
    }
  });
  return results;
};

const mapValues = (obj, func) => {
  const results = {};
  keys(obj).forEach(key => (results[key] = func(obj[key], key)));
  return results;
};

let uniqueIdCount = 0;
const uniqueId = name => {
  const id = name + '_' + uniqueIdCount;
  uniqueIdCount++;
  return id;
};

const zipObject = (a1, a2) => {
  const result = {};
  a1.forEach((a, k) => {
    result[a] = a2[k];
  });
  return result;
};

const now = () => win().Date.now();

const values = obj => obj && keys(obj).map(key => obj[key]);

const max = (p1, ...other) =>
  isEmptyArray(p1) ? Math.max(...p1) : Math.max(p1, ...other);

const min = (p1, ...other) =>
  isEmptyArray(p1) ? Math.min(...p1) : Math.min(p1, ...other);

const has = (obj, key) => {
  return obj && obj.hasOwnProperty(key);
};

const isFunction = func => FUNCTION === typeof func;

const isUndefined = val => UNDEFINED === typeof val;

const constant = v => () => v;

const union = (...arr) => {
  let newArr = [];
  arr.forEach(a => {
    newArr = [...newArr, ...a];
  });
  return dedup(newArr);
};

const transform = (obj, callback, result) => {
  keys(obj).forEach(key=>{
    const v = obj[key]; 
    callback(result, v);
  });
  return result;
};

const size = obj => obj ? keys(obj).length : 0

export {
  size,
  constant,
  union,
  isEmptyObj,
  isEmpty,
  isUndefined,
  isFunction,
  isArray,
  transform,
  has,
  values,
  max,
  min,
  range,
  rangeStep,
  flattenDownDepth,
  minBy,
  find,
  pick,
  mapValues,
  uniqueId,
  zipObject,
  now,
};
