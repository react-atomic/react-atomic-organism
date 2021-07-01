import arraySearch, { arraySearchFirst } from "./arraySearch";
import get from "get-object-value";

const arraySearchIndex = (arr, { all = false, clone = true } = {}) => (
  keyArrPath,
  store = {}
) => {
  const search = all ? arraySearch : arraySearchFirst;
  const result = [];
  store.current = search(arr, (haystack, needle) => {
    const found = get(haystack, keyArrPath);
    if (null != found) {
      const thisFund = clone ? JSON.parse(JSON.stringify(found)) : found;
      result.push(thisFund);
      return true;
    }
  })(null, (v) => v);
  return all ? result : get(result, [0]);
};

export default arraySearchIndex;
