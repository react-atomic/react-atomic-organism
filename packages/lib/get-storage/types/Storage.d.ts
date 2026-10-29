/**
 * @param {string} s
 * @returns {[number, string]}
 */
declare const parseField: (s: string) => [number, string];
/**
 * @param {string} s
 */
declare const encode: (s: string) => string;
/**
 * @param {string} s
 */
declare const decode: (s: string) => any;
declare class Storage {
    _storage: Function;
    _de: boolean;
    /**
     * @param {function} _storage
     * @param {boolean=}  _disableEncode
     */
    constructor(_storage: Function, _disableEncode?: boolean | undefined);
    /**
     * @param {string} k
     * @param {any} v
     * @returns {Storage}
     */
    set(k: string, v: any): Storage;
    /**
     * @param {object} arr
     * @returns {Storage}
     */
    merge(arr: object): Storage;
    /**
     * @param {string} k
     */
    get(k: string): any;
}
export default Storage;
export { parseField, encode, decode };
