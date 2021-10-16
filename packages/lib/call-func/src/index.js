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
  return (option) => {
    const { delay = 250, args, scope } = option || {};
    clearTimeout(timer);
    timer = setTimeout(
      () => callfunc(func, args, scope),
      defaultDelay || delay
    );
  };
};

/**
 * reduce run times.
 */
const throttle = (func, threshhold = 250, needRunLast) => {
  let waiting = false;
  let lastCall = false;
  const run = (option) => {
    const { args, scope } = option || {};
    lastCall = false;
    callfunc(func, args, scope);
  };
  return (option) => {
    lastCall = true;
    if (!waiting) {
      waiting = true;
      run(option);
      setTimeout(() => {
        waiting = false;
        if (needRunLast && lastCall) {
          run(option);
        }
      }, threshhold);
    }
  };
};

export default callfunc;
export { defaultCall, isRequired, debounce, throttle };
export { default as register, cleanAllRegister } from "./register";
