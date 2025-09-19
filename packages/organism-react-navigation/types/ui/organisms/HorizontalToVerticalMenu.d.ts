export function getHorizontalToVerticalMenu(Styles: {
    [key: string]: React.CSSProperties;
}, merge?: boolean): (props: HorizontalToVerticalMenuProps) => any;
/**
 * @param {HorizontalToVerticalMenuProps} props
 */
declare function _default(props: HorizontalToVerticalMenuProps): any;
export default _default;
export type Component = import("reshow-build").Component;
export type HorizontalToVerticalMenuProps = {
    className?: string | undefined;
    brand?: Component | undefined;
    nav?: Component | undefined;
    height?: number | undefined;
    component?: Component | undefined;
    style?: React.CSSProperties | undefined;
    children?: React.Children | undefined;
};
