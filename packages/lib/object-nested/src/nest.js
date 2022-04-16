import replaceValue from "set-object-value";
import { KEYS } from "reshow-constant";

const nest = (a, delimiter) => {
  delimiter = delimiter || ".";
  const tree = {};
  KEYS(a).forEach((k) => {
    if (-1 === k.indexOf(delimiter)) {
      tree[k] = a[k];
      return;
    }
    let subKeys = k.split(delimiter);
    replaceValue(tree, subKeys, a[k]);
  });
  return tree;
};

export default nest;
