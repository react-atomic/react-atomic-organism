export type MaybeHTMLElement = import("./types").MaybeHTMLElement;
/**
 * @typedef {import("./types").MaybeHTMLElement} MaybeHTMLElement
 */
/**
 * @param {HTMLElement} node
 * @returns {MaybeHTMLElement}
 */
declare const isSetOverflow: (node: HTMLElement) => MaybeHTMLElement;
export default isSetOverflow;
