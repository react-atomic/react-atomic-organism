export default execScript;
/**
 * @param {HTMLScriptElement} el
 * @param {window} [oWin]
 * @param {Element} [jsBase]
 * @param {Function} [errCb]
 * @param {Function} [cb]
 * @param {Function} [getScriptCb]
 */
declare function execScript(el: HTMLScriptElement, oWin?: Window & typeof globalThis, jsBase?: Element, errCb?: Function, cb?: Function, getScriptCb?: Function): () => boolean;
export function getLastScript(): any;
