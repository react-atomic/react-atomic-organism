// @ts-check
import callfunc from "./callfunc";

/**
 * @typedef {object} DebounceExecutorOption
 * @property {number=} delay
 * @property {any[]=} args
 * @property {any=} scope
 * @property {function(ReturnType<typeof setTimeout>)=} waitCallback
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
  /**
   * @type {DebounceExecutor}
   */
  const cb = (option) => {
    const { delay = 250, args, scope, waitCallback } = option || {};
    if (timer) {
      clearTimeout(timer);
    }
    callfunc(waitCallback, [timer]);
    timer = setTimeout(() => {
      timer = null;
      callfunc(func, args, scope);
    }, defaultDelay ?? delay);
  };
  return cb;
};

export default debounce;
