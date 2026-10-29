/**
 * @param {any} w
 * @param {any} def
 * @returns {Document}
 */
declare const doc: (w?: any, def?: any) => Document;
/**
 * @param {string} key
 * @returns {boolean}
 */
declare const hasWin: (key?: string) => boolean;
/**
 * @param {any} def
 * @returns {Window}
 */
declare const win: (def?: any) => Window;
export { doc, win, hasWin };
