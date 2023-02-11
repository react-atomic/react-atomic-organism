/**
 * @param {Element} base
 * @param {boolean} isPrepend
 */
export function js(base: Element, isPrepend?: boolean): (callback?: CallableFunction) => (url: string, attrs?: object) => HTMLScriptElement;
/**
 * @param {Element} base
 * @param {boolean} isPrepend
 */
export function css(base: Element, isPrepend?: boolean): (callback?: CallableFunction) => (url: string, attrs?: object) => HTMLLinkElement;
/**
 * @param {Element|function} baseInput
 * @param {boolean} isPrepend
 */
export function inject(baseInput: Element | Function, isPrepend?: boolean): (dNode: Element) => void;
/**
 * @param {string} tag
 */
export function create(tag: string): (callback?: CallableFunction) => (attrs?: object) => Element;
/**
 * @param {Element} dNode
 */
export function remove(dNode: Element): void;
