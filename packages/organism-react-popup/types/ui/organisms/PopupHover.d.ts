export default PopupHover;
declare class PopupHover extends React.PureComponent<any, any, any> {
    static defaultProps: {
        name: string;
        component: typeof SemanticUI;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    floatMouseOver: () => void;
    isKeep: boolean;
    floatMouseOut: () => void;
    mouseOver: () => void;
    mouseOut: () => void;
    open(): void;
    close(): void;
    /**
     * @param {HTMLElement} dom
     */
    handleDom: (dom: HTMLElement) => HTMLElement;
    dom: HTMLElement;
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}
import * as React from "react";
import { SemanticUI } from "react-atomic-molecule";
