export function getHorizontalToVerticalMenu(Styles: {
    [key: string]: React.CSSProperties;
}, merge?: boolean): (props: HorizontalToVerticalMenuProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
/**
 * @param {HorizontalToVerticalMenuProps} props
 */
declare function _default(props: HorizontalToVerticalMenuProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export default _default;
export type Component = import('reshow-build').Component;
export type HorizontalToVerticalMenuProps = {
    className?: string | undefined;
    brand?: Component | undefined;
    nav?: Component | undefined;
    height?: number | undefined;
    component?: Component | undefined;
    style?: React.CSSProperties | undefined;
    children?: {
        map<T, C>(children: C | readonly C[], fn: (child: C, index: number) => T): C extends null ? C : Exclude<T, boolean>[];
        forEach<C_1>(children: C_1 | readonly C_1[], fn: (child: C_1, index: number) => void): void;
        count(children: any): number;
        only<C_2>(children: C_2): C_2 extends any[] ? never : C_2;
        toArray(children: React.ReactNode | React.ReactNode[]): (string | number | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal)[];
    } | undefined;
};
import * as React from "react";
