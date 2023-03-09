export default getRandom;
declare function getRandom(): string;
/**
 * milliseconds (thousandths of a second)
 * @param {number} createTime
 * @param {number} expireMilliseconds
 * @param {function} run
 * @param {function} expireCb
 */
export function expireCallback(createTime: number, expireMilliseconds: number, run: Function, expireCb: Function): any;
/**
 * @param {number|string} t
 */
export function getDateObject(t: number | string): Date;
/**
 * @param {number|string} [t]
 */
export function getTimestamp(t?: number | string): number;
/**
 * @param {string} [name]
 */
export function getSN(name?: string): string;
