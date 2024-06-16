export default isFixed;
export type MaybeHTMLElement = import("./types").MaybeHTMLElement;
/**
 * @typedef {import("./types").MaybeHTMLElement} MaybeHTMLElement
 */
/**
 * @param {HTMLElement} node
 * @returns {MaybeHTMLElement}
 */
declare function isFixed(node: HTMLElement): MaybeHTMLElement;
