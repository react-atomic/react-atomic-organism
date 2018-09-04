import get from 'get-object-value';

const keys = Object.keys;

const range = n => Array.from(Array(n).keys());

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

  for (var i = 0; i < array.length; i++) {
    var value = array[i];

    if (depth > -1 && Array.isArray(value)) {
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
  oKeys.forEach(key => (arrMin[key] = func(obj[key], key)));
  const min = Math.min(oKeys.map(key => arrMin[key]));
  let result = null;
  oKeys.some(key => {
    if (min === arrMin[key]) {
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
    if ('undefined' !== typeof obj[key]) {
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

const now = () => window.Date.now();

export {
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
