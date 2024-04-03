export function deleteCookie(cname: string, domain?: string): void;
export default getCookie;
/**
 * @param {string} name
 * @param {string} [cookie]
 * @returns {string|null}
 */
declare function getCookie(name: string, cookie?: string): string | null;
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
export { getRegString as getCookieRegString };
