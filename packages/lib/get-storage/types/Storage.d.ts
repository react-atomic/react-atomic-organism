export default Storage;
declare class Storage {
    /**
     * @param {function} _storage
     * @param {boolean=}  _disableEncode
     */
    constructor(_storage: Function, _disableEncode?: boolean | undefined);
    _storage: Function;
    _de: boolean;
    /**
     * @param {string} k
     * @param {any} v
     */
    set(k: string, v: any): Storage;
    /**
     * @param {object} arr
     */
    merge(arr: object): undefined;
    /**
     * @param {string} k
     */
    get(k: string): any;
}
/**
 * @param {string} s
 * @returns {[number, string]}
 */
export function parseField(s: string): [number, string];
/**
 * @param {string} s
 */
export function encode(s: string): string;
/**
 * @param {string} s
 */
export function decode(s: string): any;
