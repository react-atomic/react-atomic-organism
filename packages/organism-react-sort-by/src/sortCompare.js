const ascendingSort = (column) => (aL, aR) => {
  const l = aL[column];
  const r = aR[column];
  if (isNaN(l) || isNaN(r)) {
    return ("" + l).localeCompare(r);
  } else {
    return l - r;
  }
};

const sortCompare = (column, desc) => {
  if (desc) {
    return (l, r) => ascendingSort(column)(r, l);
  } else {
    return ascendingSort(column);
  }
};

export default sortCompare;
