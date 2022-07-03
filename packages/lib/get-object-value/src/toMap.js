import { KEYS, NEW_OBJ } from "reshow-constant";
import get from "./get";
import toJS from "./toJS";

const toMap = (a, path) => {
  const next = get(a, path, NEW_OBJ());
  const nextMap = NEW_OBJ();
  if (next.forEach) {
    next.forEach((v, k) => (nextMap[k] = toJS(v)));
  } else {
    KEYS(next).forEach((k) => (nextMap[k] = toJS(next[k])));
  }
  return nextMap;
};

export default toMap;
