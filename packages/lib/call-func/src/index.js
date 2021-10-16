import callfunc from "./callfunc";

const defaultCall =
  (defaultFunc, func, scope) =>
  (...args) =>
    callfunc(func || defaultFunc, args, scope);

const isRequired = (name = "param") => {
  throw new Error(`${name} is required`);
};

/**
 * only run lasttime.
 */
const debounce = (func, defaultDelay) => {
  let timer;
  return (delay = 250) => {
    clearTimeout(timer);
    timer = setTimeout(func, defaultDelay || delay);
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
    callfunc(func);
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

export default callfunc;
export { defaultCall, isRequired, debounce, throttle };
export { default as register, cleanAllRegister } from "./register";
