export default isFixed;
export type MaybeHTMLElement = import("./MaybeHTMLElement").MaybeHTMLElement;
/**
 * @typedef {import("./MaybeHTMLElement").MaybeHTMLElement} MaybeHTMLElement
 */
/**
 * @param {HTMLElement} node
 * @returns {MaybeHTMLElement}
 */
declare function isFixed(node: HTMLElement): MaybeHTMLElement;
