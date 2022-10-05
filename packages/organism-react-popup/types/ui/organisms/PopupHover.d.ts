export default PopupHover;
declare class PopupHover extends PureComponent<any, any, any> {
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
    handleDom: (dom: any) => any;
    dom: any;
    render(): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
}
import { PureComponent } from "react";
import { SemanticUI } from "react-atomic-molecule";
