export default PopupHover;
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
declare class PopupHover {
    static defaultProps: {
        name: string;
        component: typeof SemanticUI;
    };
    /** @type {PopupHoverProps} */
    props: PopupHoverProps;
    /** @type {PopupHoverState} */
    state: PopupHoverState;
    /** @type {function(Partial<PopupHoverState>, function(): void=): void} */
    setState: (arg0: Partial<PopupHoverState>, arg1: (() => void) | undefined) => void;
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
    render(): any;
}
import { SemanticUI } from "react-atomic-molecule";
