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
    floatTop: any;
    floatLeft: any;
    floatWidth: any;
    floatHeight: any;
    floatClassName: any;
    calPos: () => {
        top: number;
        left: number;
    } | {
        top: any;
        left: any;
        className: any;
    };
    setFloatEl: (el: any) => void;
    floatEl: any;
    /**
     * For extend class
     */
    getFloatEl(): any;
    state: {
        refCb: (el: any) => void;
        hasError: boolean;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any): void;
    componentWillUnmount(): void;
}
import PopupOverlay from "../molecules/PopupOverlay";
