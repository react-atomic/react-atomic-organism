export default PopupFloatEl;
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
import PopupOverlay from "../molecules/PopupOverlay";
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
