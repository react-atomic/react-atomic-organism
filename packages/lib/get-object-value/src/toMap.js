import { KEYS } from "reshow-constant";
import get from "./get";
import toJS from "./toJS";

const toMap = (a, path) => {
  const next = get(a, path, {});
  const nextMap = {};
  KEYS(next).forEach((key) => (nextMap[key] = toJS(next[key])));
  return nextMap;
};

export default toMap;
