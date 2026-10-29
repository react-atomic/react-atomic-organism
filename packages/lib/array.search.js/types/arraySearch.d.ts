export type KeywordCallback = (needle: any, cb?: any) => any;
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
declare const arraySearchFirst: (arr?: any[], exact?: any) => KeywordCallback;
/**
 * @param {any[]} [arr]
 * @param {any} [exact]
 * @returns {KeywordCallback}
 */
declare const arraySearchLast: (arr?: any[], exact?: any) => KeywordCallback;
/**
 * @param {any[]} [arr]
 * @param {any} [exact]
 * @returns {KeywordCallback}
 */
declare const arraySearch: (arr?: any[], exact?: any) => KeywordCallback;
export default arraySearch;
export { arraySearchFirst, arraySearchLast };
