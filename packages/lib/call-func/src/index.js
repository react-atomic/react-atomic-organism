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

/**
 * only run lasttime.
 */
const debounce = (func, delay = 250) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
};

/**
 * reduce run times.
 */
const throttle = (func, threshhold = 250, needRunLast) => {
  let waiting = false;
  let lastCall = false;
  const run = () => {
    lastCall = false;
    callFunc(func);
  };
  return () => {
    lastCall = true;
    if (!waiting) {
      waiting = true;
      run();
      setTimeout(() => {
        waiting = false;
        if (needRunLast && lastCall) {
          run();
        }
      }, threshhold);
    }
  };
};

export default callFunc;
export { defaultCall, isRequired, debounce, throttle };
