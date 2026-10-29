export type UseProgressExpose = {
    complete: Function;
    reset: Function;
    pause: Function;
    start: Function;
};
export type UseProgressReturn = {
    expose: UseProgressExpose;
    opacity: number;
    percent: number;
};
/**
 * @typedef {object} UseProgressExpose
 * @property {Function} complete
 * @property {Function} reset
 * @property {Function} pause
 * @property {Function} start
 */
/**
 * @typedef {object} UseProgressReturn
 * @property {UseProgressExpose} expose
 * @property {number} opacity
 * @property {number} percent
 */
/**
 * @param {number} [propsDelay]
 * @param {number} [propsPercent]
 * @returns {UseProgressReturn}
 */
declare const useProgress: (propsDelay?: number, propsPercent?: number) => UseProgressReturn;
export default useProgress;
