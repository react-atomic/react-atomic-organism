import callfunc from "./callfunc";

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

export default debounce;
