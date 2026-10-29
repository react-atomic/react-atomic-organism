/**
 * @param {string} name
 * @returns {string}
 */
declare const getRegString: (name: string) => string;
/**
 * @param {string} name
 * @returns {RegExp}
 */
declare const getCookieReg: (name: string) => RegExp;
/**
 * @param {string} name
 * @param {string} [cookie]
 * @returns {string|null}
 */
declare const getCookie: (name: string, cookie?: string) => string | null;
/**
 * @param {string} cname
 * @param {string} cvalue
 * @param {number} [exdays]
 * @param {string} [domain]
 */
declare const setCookie: (cname: string, cvalue: string, exdays?: number, domain?: string) => void;
/**
 * @param {string} cname
 * @param {string} [domain]
 */
export declare const deleteCookie: (cname: string, domain?: string) => void;
export default getCookie;
export { getRegString as getCookieRegString, getCookieReg, setCookie };
