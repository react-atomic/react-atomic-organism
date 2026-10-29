/**
 * @param {number|string} [t]
 */
declare const getDateObject: (t?: number | string) => Date;
/**
 * @param {number|string} [t]
 */
declare const getTimestamp: (t?: number | string) => number;
/**
 * milliseconds (thousandths of a second)
 * @param {number?} createTime
 * @param {number?} expireMilliseconds
 * @param {function|null} run
 * @param {function|null} expireCb
 */
declare const expireCallback: (createTime: number | null, expireMilliseconds: number | null, run: Function | null, expireCb: Function | null) => any;
/**
 * @param {string} [name]
 * @param {string} [separator]
 */
declare const getSN: (name?: string, separator?: string) => string;
declare const getRandom: () => string;
export default getRandom;
export { expireCallback, getDateObject, getTimestamp, getSN };
