export default PopupModal;
/**
 * 1. if you need trace show: true
 * it extend from PopupOverlay
 *
 * 2. if you don't need append <Content /> component
 * you could pass center or content to equla false
 */
declare class PopupModal extends PopupOverlay {
    static defaultProps: {
        mask: boolean;
        name: string;
        modalClassName: string;
    };
    _timer: any;
    _mount: boolean;
    _locked: boolean;
    _observer: any;
    handleModalRefCb: (el: any) => any;
    el: any;
    handleClose: () => void;
    handleContainerClick: (e: any) => void;
    handleKeyUp: (e: any) => void;
    reCalculate: () => void;
    getBodyResetClass(): any;
    resetBodyCssClass(): void;
    setBodyCssClass(): void;
    lockScreen(): void;
    unlockScreen(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
import PopupOverlay from "../molecules/PopupOverlay";
