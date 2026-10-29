export type SAFE_UNDEFINED = import("reshow-constant").SAFE_UNDEFINED;
/**
 * @typedef {import("reshow-constant").SAFE_UNDEFINED} SAFE_UNDEFINED
 */
declare class URLType {
    /**
     * @type string
     */
    host: string;
    /**
     * @type string
     */
    hostname: string;
    /**
     * @type string
     */
    query: string;
    /**
     * @type string
     */
    path: string;
}
/**
 * @param {string} url
 * @returns {URLType}
 */
declare const parseUrl: (url: string) => URLType;
/**
 * @param {string|SAFE_UNDEFINED} [url]
 * @returns {string}
 */
declare const resetUrl: (url?: string | SAFE_UNDEFINED) => string;
/**
 * @param {string|string[]} keys
 * @param {string} [origUrl]
 */
declare const getUrl: (keys: string | string[], origUrl?: string) => any;
/**
 * @param {string} key
 * @param {string} origUrl
 */
declare const getUrlArray: (key: string, origUrl: string) => any[];
/**
 * @param {string|number} key
 * @param {string} [url]
 * @returns {string}
 */
declare const unsetUrl: (key: string | number, url?: string) => string;
/**
 * @param {string|number} key
 * @param {string|number} value
 * @param {string} url
 * @param {boolean=} KeepRawValue
 */
declare const setUrl: (key: string | number, value: string | number, url: string, KeepRawValue?: boolean | undefined) => string;
export { getUrl, getUrlArray, parseUrl, unsetUrl, resetUrl as url };
export default setUrl;
