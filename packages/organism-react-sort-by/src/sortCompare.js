const ascendingSort = (column) => (aL, aR) => {
  const l = aL[column];
  const r = aR[column];
  if (isNaN(l) || isNaN(r)) {
    return ("" + l).localeCompare(r);
  } else {
    return l - r;
  }
};

const sortCompare = (column, desc = -1) => {
  desc = desc * 1;
  if (desc > 0) {
    return (l, r) => ascendingSort(column)(r, l);
  } else if (desc < 0) {
    return ascendingSort(column);
  }
};

export default sortCompare;
