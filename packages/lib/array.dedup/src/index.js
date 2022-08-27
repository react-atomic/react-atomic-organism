const dedup = (array, reverse) => {
  if (!array || !array.filter) {
    return array;
  }
  // This way could keep array in same position
  if (reverse) { 
    return array.filter((item, pos, arr) => arr.lastIndexOf(item) === pos);
  } else {
    return array.filter((item, pos, arr) => arr.indexOf(item) === pos);
  }
};

export default dedup;
