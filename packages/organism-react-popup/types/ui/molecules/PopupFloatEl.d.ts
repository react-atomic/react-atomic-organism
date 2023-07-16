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
     * @param {React.ReactElement} el
     */
    setFloatEl: (el: React.ReactElement) => void;
    floatEl: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
    /**
     * For extend class
     */
    getFloatEl(): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
    state: {
        refCb: (el: React.ReactElement) => void;
        hasError: boolean;
    };
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
