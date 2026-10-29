export type MaybeHTMLElement = import("./types").MaybeHTMLElement;
/**
 * @typedef {import("./types").MaybeHTMLElement} MaybeHTMLElement
 */
/**
 * @param {HTMLElement} node
 * @returns {MaybeHTMLElement}
 */
declare const isFixed: (node: HTMLElement) => MaybeHTMLElement;
export default isFixed;
