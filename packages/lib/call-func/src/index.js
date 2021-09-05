import { FUNCTION } from "reshow-constant";

const callFunc = (func, args, scope) =>
  FUNCTION === typeof func ? func.apply(scope, args) : func;

const defaultCall =
  (defaultFunc, func, scope) =>
  (...args) =>
    callFunc(func || defaultFunc, args, scope);

const isRequired = (name = "param") => {
  throw new Error(`${name} is required`);
};

export default callFunc;
export { defaultCall, isRequired };
