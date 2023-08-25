export default anyToArray;
export type SAFE_UNDEFINED = import("reshow-constant").SAFE_UNDEFINED;
/**
 * @param {any} val
 * @param {Function} testFunc
 * @returns {any[]}
 */
declare function anyToArray(val: any, testFunc: Function): any[];
/**
 * @typedef {import("reshow-constant").SAFE_UNDEFINED} SAFE_UNDEFINED
 */
/**
 * @param {any[]|string|number|SAFE_UNDEFINED} maybeArray
 */
export function oneItemArrayToString(maybeArray: any[] | string | number | SAFE_UNDEFINED): any;
export function objectToArray(obj: any): any[];
/**
 * @param {any[]} arr
 * @param {string} key
 */
export function arrayToObject(arr: any[], key: string): {};
/**
 * Contain null, undefined, numeric, string
 * @param {any} s
 */
export function testString(s: any): boolean;
/**
 * @param {string|number} maybeString
 */
export function stringToArray(maybeString: string | number): any[];
