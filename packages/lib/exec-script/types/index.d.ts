declare const getLastScript: () => any;
/**
 * @param {HTMLElement} el
 * @param {Window} [oWin]
 * @param {Element} [jsBase]
 * @param {Function} [errCb]
 * @param {Function} [cb]
 * @param {Function} [getScriptCb]
 */
declare const execScript: (el: HTMLElement, oWin?: Window, jsBase?: Element, errCb?: Function, cb?: Function, getScriptCb?: Function) => () => boolean;
export default execScript;
export { getLastScript };
