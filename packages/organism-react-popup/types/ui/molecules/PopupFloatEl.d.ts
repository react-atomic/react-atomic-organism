export default PopupFloatEl;
export type PopupFloatElProps = import("./BasePopup").BasePopupProps & any;
export type PopupFloatElState = import("./BasePopup").BasePopupState & PositionInfo & any;
/**
 * @extends {PopupOverlay}
 */
declare class PopupFloatEl extends PopupOverlay {
    static defaultProps: {
        style: {
            position: string;
            right: string;
        };
        name: string;
        className: string;
        retryAt: number;
    };
    /** @type {PopupFloatElState} */
    state: PopupFloatElState;
    /** @type {function(Partial<PopupFloatElState>, function(): void=): void} */
    setState: (arg0: Partial<PopupFloatElState>, arg1: (() => void) | undefined) => void;
    _mount: boolean;
    /**
     * For monitor window resize
     */
    handleResize: () => void;
    handleMoveTo: () => void;
    floatTop: number;
    floatLeft: number;
    floatClassName: string;
    /**
     * @returns {PositionInfo|undefined}
     */
    calPos: () => PositionInfo | undefined;
    /**
     * @param {HTMLElement} el
     */
    setFloatEl: (el: HTMLElement) => void;
    floatEl: HTMLElement;
    /**
     * For extend class
     */
    getFloatEl(): HTMLElement;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
}
/**
 * @typedef {import("./BasePopup").BasePopupProps & Object} PopupFloatElProps
 * @property {HTMLElement} [targetEl] - Target element to position relative to
 * @property {Object} [alignParams] - Alignment parameters
 * @property {number} [retryAt] - Retry timeout
 * @property {Object} [style] - CSS style object
 */
/**
 * @typedef {import("./BasePopup").BasePopupState & PositionInfo & Object} PopupFloatElState
 * @property {function} [refCb] - Ref callback function
 */
declare class PositionInfo {
    /**
     * @type number
     */
    top: number;
    /**
     * @type number
     */
    left: number;
    /**
     * @type string
     */
    className: string;
}
import PopupOverlay from "../molecules/PopupOverlay";
