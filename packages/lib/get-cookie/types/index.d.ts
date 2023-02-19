export default getCookie;
/**
 * @param {string} [name]
 * @param {string} [cookie]
 */
declare function getCookie(name?: string, cookie?: string): string;
/**
 * @param {string} name
 * @returns {string}
 */
declare function getRegString(name: string): string;
/**
 * @param {string} name
 * @returns {RegExp}
 */
export function getCookieReg(name: string): RegExp;
/**
 * @param {string} cname
 * @param {string} cvalue
 * @param {number} [exdays]
 * @param {string} [domain]
 */
export function setCookie(cname: string, cvalue: string, exdays?: number, domain?: string): void;
/**
 * @param {string} cname
 * @param {string} cvalue
 * @param {number} [exdays]
 * @param {string} [domain]
 * @returns {string}
 */
export function getCookieSetStr(cname: string, cvalue: string, exdays?: number, domain?: string): string;
export { getRegString as getCookieRegString };
