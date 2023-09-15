// @ts-check

/**
 * @param {any} array
 * @param {boolean} [reverse]
 * @returns {any}
 */
const dedup = (array, reverse) => {
  if (!array || !array.filter) {
    return array;
  }
  // This way could keep array in same position
  if (reverse) {
    return /**@type any[]*/(array).filter((item, pos, arr) => arr.lastIndexOf(item) === pos);
  } else {
    return /**@type any[]*/(array).filter((item, pos, arr) => arr.indexOf(item) === pos);
  }
};

export default dedup;
