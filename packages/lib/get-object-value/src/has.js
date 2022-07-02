import { HAS } from "reshow-constant";
import callfunc from "call-func";

const HasMap = (o, k) => (o && o.size && callfunc(o.has, [k], o)) ?? HAS(o, k);

export default HasMap;
