export function getHorizontalToVerticalMenu(Styles: {
    [key: string]: React.CSSProperties;
}, merge?: boolean): (props: HorizontalToVerticalMenuProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
/**
 * @param {HorizontalToVerticalMenuProps} props
 */
declare function _default(props: HorizontalToVerticalMenuProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export default _default;
export type Component = import("reshow-build").Component;
export type HorizontalToVerticalMenuProps = {
    className?: string | undefined;
    brand?: Component | undefined;
    nav?: Component | undefined;
    height?: number | undefined;
    component?: Component | undefined;
    style?: React.CSSProperties | undefined;
    children?: {
        map<T, C>(children: C | readonly C[], fn: (child: C, index: number) => T): C extends null | undefined ? C : Array<Exclude<T, boolean | null | undefined>>;
        forEach<C>(children: C | readonly C[], fn: (child: C, index: number) => void): void;
        count(children: any): number;
        only<C>(children: C): C extends any[] ? never : C;
        toArray(children: React.ReactNode | React.ReactNode[]): Array<Exclude<React.ReactNode, boolean | null | undefined>>;
    } | undefined;
};
import * as React from "react";
