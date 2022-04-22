import callfunc from "./callfunc";

const defaultCall =
  (defaultFunc, func, scope) =>
  (...args) =>
    callfunc(func || defaultFunc, args, scope);

export default defaultCall;
