export default arraySearch;
export type KeywordCallback = (needle: any, cb?: any) => any;
/**
 * @param {any[]} [arr]
 * @param {any} [exact]
 * @returns {KeywordCallback}
 */
declare function arraySearch(arr?: any[], exact?: any): KeywordCallback;
/**
 * @callback KeywordCallback
 * @param {any} needle
 * @param {any} [cb]
 */
/**
 * @param {any[]} [arr]
 * @param {any} [exact]
 * @returns {KeywordCallback}
 */
export function arraySearchFirst(arr?: any[], exact?: any): KeywordCallback;
/**
 * @param {any[]} [arr]
 * @param {any} [exact]
 * @returns {KeywordCallback}
 */
export function arraySearchLast(arr?: any[], exact?: any): KeywordCallback;
