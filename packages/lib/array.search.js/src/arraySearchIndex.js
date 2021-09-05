import arraySearch, { arraySearchFirst } from "./arraySearch";
import get from "get-object-value";

const defaultOptions = { all: false, clone: true, backfill: false };

const arraySearchIndex =
  (arr, options) =>
  (keyArrPath, store = {}) => {
    const { all, clone, backfill } = { ...defaultOptions, ...options };
    const isGetAll = all || backfill;
    const search = isGetAll ? arraySearch : arraySearchFirst;
    const result = [];
    store.current = search(arr, (haystack, needle) => {
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
