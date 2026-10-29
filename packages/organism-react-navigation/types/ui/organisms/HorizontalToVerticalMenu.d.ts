import * as React from "react";
export type Component = import('reshow-build').Component;
export type HorizontalToVerticalMenuProps = {
    className?: string | undefined;
    brand?: Component | undefined;
    nav?: Component | undefined;
    height?: number | undefined;
    component?: Component | undefined;
    style?: React.CSSProperties | undefined;
    children?: React.ReactNode | undefined;
};
/**
 * @typedef {import('reshow-build').Component} Component
 */
/**
 * @typedef {object} HorizontalToVerticalMenuProps
 * @property {string=} className
 * @property {Component=} brand
 * @property {Component=} nav
 * @property {number=} height
 * @property {Component=} component
 * @property {React.CSSProperties=} style
 * @property {React.ReactNode=} children
 */
/**
 * @param {{[key: string]:React.CSSProperties}} Styles
 * @param {boolean} [merge]
 */
export declare const getHorizontalToVerticalMenu: (Styles: {
    [key: string]: React.CSSProperties;
}, merge?: boolean) => (props: HorizontalToVerticalMenuProps) => React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
declare const _default: (props: HorizontalToVerticalMenuProps) => React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
export default _default;
