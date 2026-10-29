/**
 *  !!Important!! any logic change need take care isRunning
 *
 *  @param {number} to
 *  @param {number} [duration]
 *  @param {HTMLElement} [el]
 *  @param {function} [callback]
 *  @param {string} [scrollKey]
 *  @returns {function} cancel handler
 */
declare const smoothScrollTo: (to: number, duration?: number, el?: HTMLElement, callback?: Function, scrollKey?: string) => Function;
export default smoothScrollTo;
