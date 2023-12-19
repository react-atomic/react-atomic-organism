// @ts-check

/**
 * @param {any[]} array
 * @param {boolean} [reverse]
 * @param {Function} [cb]
 * @returns {any[]}
 */
const dedup = (array, reverse, cb) => {
  if (!array || !array.filter) {
    return array;
  }

  const exists = Object.create(null);
  const handelFilter = (/**@type any*/ item) => {
    const val = cb ? cb(item) : item;
    if (exists[val]) {
      return false;
    } else {
      exists[val] = true;
      return true;
    }
  };

  // This way could keep array in same position
  if (reverse) {
    return /**@type any[]*/ ([...array])
      .reverse()
      .filter(handelFilter)
      .reverse();
  } else {
    return /**@type any[]*/ (array).filter(handelFilter);
  }
};

export default dedup;
