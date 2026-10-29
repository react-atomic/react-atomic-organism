declare const objectToArray: (/**@type any*/ obj: any) => any[];
/**
 * @param {any[]} arr
 * @param {string} key
 */
declare const arrayToObject: (arr: any[], key: string) => {};
export type SAFE_UNDEFINED = import("reshow-constant").SAFE_UNDEFINED;
/**
 * @typedef {import("reshow-constant").SAFE_UNDEFINED} SAFE_UNDEFINED
 */
/**
 * @param {any[]|string|number|SAFE_UNDEFINED} maybeArray
 */
declare const oneItemArrayToString: (maybeArray: any[] | string | number | SAFE_UNDEFINED) => any;
/**
 * Contain null, undefined, numeric, string
 * @param {any} s
 */
declare const testString: (s: any) => boolean;
/**
 * @param {string|number} maybeString
 */
declare const stringToArray: (maybeString: string | number) => any[];
/**
 * @param {any} val
 * @param {Function} testFunc
 * @returns {any[]}
 */
declare const anyToArray: (val: any, testFunc: Function) => any[];
export default anyToArray;
export { oneItemArrayToString, objectToArray, arrayToObject, testString, stringToArray, };
