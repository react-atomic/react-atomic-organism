import { FUNCTION, UNDEFINED } from "reshow-constant";

const callFunc = (func, args, scope, def) =>
  FUNCTION === typeof func
    ? func.apply(scope, args)
    : UNDEFINED !== typeof def
    ? def
    : func;

export default callFunc;
