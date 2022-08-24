"use strict";

const split = (s, delimiter) => {
  if (!s) {
    return [];
  }
  if (!delimiter) {
    delimiter = "*";
  }
  const raw = s.split(delimiter);
  const len = raw.length - 1;
  const cook = raw.map((item, i) => {
    if (i % 2 === 0 || i === len) {
      return [0, item];
    } else {
      return [1, item];
    }
  });
  return cook;
};

export default split;
