export default setUrl;
export type SAFE_UNDEFINED = import("reshow-constant").SAFE_UNDEFINED;
/**
 * @param {string|string[]} keys
 * @param {string} [origUrl]
 */
export function getUrl(keys: string | string[], origUrl?: string): any;
/**
 * @param {string} key
 * @param {string} origUrl
 */
export function getUrlArray(key: string, origUrl: string): string[];
/**
 * @param {string} url
 * @returns {URLType}
 */
export function parseUrl(url: string): URLType;
/**
 * @param {string|number} key
 * @param {string} [url]
 * @returns {string}
 */
export function unsetUrl(key: string | number, url?: string): string;
/**
 * @param {string|SAFE_UNDEFINED} url
 * @returns {string}
 */
declare function resetUrl(url: string | SAFE_UNDEFINED): string;
/**
 * @param {string|number} key
 * @param {string|number} value
 * @param {string} url
 * @param {boolean=} KeepRawValue
 */
declare function setUrl(key: string | number, value: string | number, url: string, KeepRawValue?: boolean | undefined): string;
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
export { resetUrl as url };
