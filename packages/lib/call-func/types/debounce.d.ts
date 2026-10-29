export type DebounceExecutorOption = {
    delay?: number | undefined;
    args?: any[] | undefined;
    scope?: any | undefined;
    waitCallback?: (timer: ReturnType<typeof setTimeout>) => void;
};
export type DebounceExecutor = (option?: DebounceExecutorOption | undefined) => any;
/**
 * @typedef {object} DebounceExecutorOption
 * @property {number=} delay
 * @property {any[]=} args
 * @property {any=} scope
 * @property {(timer: ReturnType<typeof setTimeout>) => void} [waitCallback]
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
declare const debounce: (func: Function, defaultDelay?: number | undefined) => DebounceExecutor;
export default debounce;
