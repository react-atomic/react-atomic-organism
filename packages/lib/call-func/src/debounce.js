// @ts-check
import callfunc from "./callfunc";

/**
 * @typedef {object} DebounceExecutorOption
 * @property {number=} delay
 * @property {any[]=} args
 * @property {any=} scope
 */

/**
 * @callback DebounceExecutor
 * @param {DebounceExecutorOption=} option
 */

/**
 * only run lasttime.
 *
 * @param {Function} func
 * @param {number=} defaultDelay
 * @returns {DebounceExecutor}
 */
const debounce = (func, defaultDelay) => {
  let timer;
  return (option) => {
    const { delay = 250, args, scope } = option || {};
    clearTimeout(timer);
    timer = setTimeout(
      () => callfunc(func, args, scope),
      defaultDelay ?? delay
    );
  };
};

export default debounce;
