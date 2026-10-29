import PopupOverlay from "../molecules/PopupOverlay";
export type PopupFloatElProps = import("./BasePopup").BasePopupProps & Object;
export type PopupFloatElState = import("./BasePopup").BasePopupState & PositionInfo & Object;
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
/**
 * @extends {PopupOverlay}
 */
declare class PopupFloatEl extends PopupOverlay {
    floatTop: number;
    floatLeft: number;
    floatClassName: string;
    floatEl: HTMLElement;
    state: any;
    _mount: boolean;
    static defaultProps: {
        style: {
            position: string;
            right: string;
        };
        name: string;
        className: string;
        retryAt: number;
    };
    /**
     * For monitor window resize
     */
    handleResize: () => void;
    handleMoveTo: () => void;
    /**
     * @returns {PositionInfo|undefined}
     */
    calPos: () => PositionInfo | undefined;
    /**
     * @param {HTMLElement} el
     */
    setFloatEl: (el: HTMLElement) => void;
    /**
     * For extend class
     */
    getFloatEl(): HTMLElement;
    /**
     * @param {PopupFloatElProps} props
     */
    constructor(props: PopupFloatElProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
}
export default PopupFloatEl;
