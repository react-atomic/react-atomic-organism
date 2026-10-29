/**
 * @param {any} maybeMap
 * @param {function} cb
 */
export declare const forEachMap: (maybeMap: any, cb: Function) => void;
/**
 * @param {any} maybeMap
 * @param {any} k
 * @param {any} v
 */
export declare const setMap: (maybeMap: any, k: any, v: any) => any;
/**
 * @param {any} a
 * @param {any[]=} path
 * @returns {any}
 */
declare const toMap: (a: any, path?: any[] | undefined) => any;
export default toMap;
