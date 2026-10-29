/**
 * @param {any} num
 * @returns {string}
 */
declare const toPercent: (num: any) => string;
/**
 * @param {any} num
 * @returns {string}
 */
declare const percent: (num: any) => string;
/**
 * @param {number} f
 * @param {number} [precision]
 * @returns {string}
 */
declare const round: (f: number, precision?: number) => string;
/**
 * @param {any} num
 * @returns {number}
 */
declare const toNum: (num: any) => number;
/**
 * @param {any} num
 * @returns {number}
 */
declare const toInt: (num: any) => number;
/**
 * @param {any} s
 * @returns {number}
 */
declare const getNum: (s: any) => number;
export { round, percent, toNum, getNum, toInt };
export default toPercent;
