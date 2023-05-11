/**
 * @param {object|undefined} w
 * @param {any} def
 * @returns {document}
 */
export function doc(w?: object | undefined, def?: any): Document;
/**
 * @param {any} def
 * @returns {window}
 */
export function win(def?: any): Window & typeof globalThis;
/**
 * @param {string} key
 * @returns {boolean}
 */
export function hasWin(key?: string): boolean;
