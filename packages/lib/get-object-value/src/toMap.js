import { KEYS } from "reshow-constant";
import get from "./get";
import toJS from "./toJS";

const toMap = (a, path) => {
  const next = get(a, path, {});
  const nextMap = {};
  if (next.forEach) {
    next.forEach((v, k) => (nextMap[k] = toJS(v)));
  } else {
    KEYS(next).forEach((k) => (nextMap[k] = toJS(next[k])));
  }
  return nextMap;
};

export default toMap;
