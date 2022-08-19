import { FUNCTION, UNDEFINED } from "reshow-constant";

const callFunc = (maybeFunc, args, scope, def) =>
  FUNCTION === typeof maybeFunc
    ? maybeFunc.apply(scope, args)
    : UNDEFINED !== typeof def
    ? def
    : maybeFunc;

export default callFunc;
