import callfunc from "./callfunc";

/**
 * reduce run times.
 */
const throttle = (func, threshhold, needRunLast) => {
  threshhold = threshhold ?? 250;
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

export default throttle;
