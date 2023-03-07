export default useProgress;
export type UseProgressReturn = {
    expose: object;
    opacity: number;
    percent: number;
};
/**
 * @typedef {object} UseProgressReturn
 * @property {object} expose
 * @property {number} opacity
 * @property {number} percent
 */
/**
 * @param {number} [propsDelay]
 * @param {number} [propsPercent]
 * @returns {UseProgressReturn}
 */
declare function useProgress(propsDelay?: number, propsPercent?: number): UseProgressReturn;
