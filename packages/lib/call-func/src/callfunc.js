import { FUNCTION } from "reshow-constant";

const callFunc = (func, args, scope) =>
  FUNCTION === typeof func ? func.apply(scope, args) : func;

export default callFunc;
