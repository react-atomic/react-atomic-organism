const keys = Object.keys;

const removeEmpty = (arr, undefinedOnly, exclude) => {
  const result = {};
  keys(arr).forEach(key => {
    const value = arr[key];
    if (exclude && exclude.length && -1 !== exclude.indexOf(key)) {
      return;
    }
    if (value || (undefinedOnly && 'undefined' !== typeof value)) {
      result[key] = value;
    }
  });
  return result;
};

export default removeEmpty;
