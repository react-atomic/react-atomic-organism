export default PopupPool;
export type Component = import("reshow-build").Component;
/**
 * @typedef {import('reshow-build').Component} Component
 */
/**
 * @param {{component?: Component, name?: string}} props
 */
declare function PopupPool({ component, name, ...restProps }: {
    component?: Component;
    name?: string;
}): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
