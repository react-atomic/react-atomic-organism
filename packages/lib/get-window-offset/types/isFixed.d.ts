export default isFixed;
export type MaybeHTMLElement = import("./type").MaybeHTMLElement;
/**
 * @typedef {import("./type").MaybeHTMLElement} MaybeHTMLElement
 */
/**
 * @param {HTMLElement} node
 * @returns {MaybeHTMLElement}
 */
declare function isFixed(node: HTMLElement): MaybeHTMLElement;
