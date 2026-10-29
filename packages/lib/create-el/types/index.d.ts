/**
 * @param {Element|function} [baseInput]
 * @param {boolean} [isPrepend]
 */
declare const inject: (baseInput?: Element | Function, isPrepend?: boolean) => (dNode: Element) => void;
/**
 * @param {string} tag
 */
declare const create: (tag: string) => (callback?: Function) => (attrs?: object) => Element | undefined;
/**
 * @param {Element} dNode
 */
declare const remove: (dNode: Element) => void;
/**
 * @param {Element|boolean} [base]
 * @param {boolean} [isPrepend]
 */
declare const js: (base?: Element | boolean, isPrepend?: boolean) => (callback?: Function) => (url: string, attrs?: object) => HTMLScriptElement;
/**
 * @param {Element|boolean} [base]
 * @param {boolean} [isPrepend]
 */
declare const css: (base?: Element | boolean, isPrepend?: boolean) => (callback?: Function) => (url: string, attrs?: object) => HTMLLinkElement;
export { js, css, inject, create, remove };
