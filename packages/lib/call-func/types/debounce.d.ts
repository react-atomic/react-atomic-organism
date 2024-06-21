export default debounce;
export type DebounceExecutorOption = {
    delay?: number | undefined;
    args?: any[] | undefined;
    scope?: any | undefined;
};
export type DebounceExecutor = (option?: DebounceExecutorOption | undefined) => any;
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
declare function debounce(func: Function, defaultDelay?: number | undefined): DebounceExecutor;
