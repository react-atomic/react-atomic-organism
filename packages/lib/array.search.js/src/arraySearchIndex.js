import arraySearch, { arraySearchLast } from "./arraySearch";
import get from "get-object-value";
import { stringToArray } from "with-array";

const arraySearchIndex =
  (arr, options) =>
  (keyArrPath, store = {}) => {
    const { all = false, clone = true, backfill = false } = options || {};
    const isGetAll = all || backfill;
    const search = isGetAll ? arraySearch : arraySearchLast;
    const result = [];
    keyArrPath = stringToArray(keyArrPath);
    store.current = search(arr, (haystack) => {
      const found = get(haystack, keyArrPath);
      if (null != found) {
        const thisFund = clone ? JSON.parse(JSON.stringify(found)) : found;
        result.push(thisFund);
        return true;
      } else {
        if (backfill) {
          result.push(undefined);
          return true;
        } else {
          return false;
        }
      }
    })(null, (v) => v);
    return isGetAll ? result : get(result, [0]);
  };

export default arraySearchIndex;
