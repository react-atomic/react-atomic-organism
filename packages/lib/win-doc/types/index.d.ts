/**
 * @param {object|undefined} w
 * @param {object} def
 * @returns {document}
 */
export function doc(w?: object | undefined, def?: object): Document;
/**
 * @param {object} def
 * @returns {window}
 */
export function win(def?: object): Window & typeof globalThis;
/**
 * @param {string} key
 * @returns {boolean}
 */
export function hasWin(key?: string): boolean;
