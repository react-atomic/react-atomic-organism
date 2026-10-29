export type Component = import('reshow-build').Component;
/**
 * @typedef {import('reshow-build').Component} Component
 */
/**
 * @param {{component?: Component, name?: string}} props
 */
declare const PopupPool: ({ component, name, ...restProps }: {
    component?: Component;
    name?: string;
}) => import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>>;
export default PopupPool;
