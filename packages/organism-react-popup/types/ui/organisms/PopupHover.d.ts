import * as React from "react";
declare const PureComponent: typeof React.PureComponent;
export type PopupHoverProps = {
    /**
     * - Component name
     */
    name?: string;
    /**
     * - React component to render
     */
    component?: any;
    /**
     * - React children
     */
    children?: any;
    /**
     * - Popup content
     */
    popup?: any;
    /**
     * - Trigger item
     */
    triggerItem?: any;
    /**
     * - Callback function
     */
    callback?: Function;
    /**
     * - Keep popup open
     */
    isKeep?: boolean;
    /**
     * - Close handler
     */
    onClose?: Function;
    /**
     * - Use popup pool
     */
    toPool?: boolean;
    /**
     * - Alignment parameters
     */
    alignParams?: any;
};
export type PopupHoverState = {
    /**
     * - Show state
     */
    show?: any;
    /**
     * - Trigger item state
     */
    triggerItem?: any;
    /**
     * - Bust state
     */
    bust?: any;
};
/**
 * @extends {React.PureComponent<PopupHoverProps, PopupHoverState>}
 */
declare class PopupHover extends PureComponent {
    isKeep: boolean;
    dom: HTMLElement;
    static defaultProps: {
        name: string;
        component: ({ ui, renderChildren, atoms, useCSS, cssList, refCb, atom, children, styles, styleOrder, ...restProps }: import("react-atomic-molecule/types/ui/molecules/SemanticUI").SemanticUIProps & React.HTMLProps<any>) => React.ReactElement | null;
    };
    floatMouseOver: () => void;
    floatMouseOut: () => void;
    mouseOver: () => void;
    mouseOut: () => void;
    open(): void;
    close(): void;
    /**
     * @param {HTMLElement} dom
     */
    handleDom: (dom: HTMLElement) => HTMLElement;
    render(): React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
}
export default PopupHover;
