const dedup = (array) => {
  if (!array || !array.filter) {
    return array;
  }
  // This way could keep array in same position
  return array.filter((item, pos, arr) => arr.indexOf(item) === pos);
};

export default dedup;
