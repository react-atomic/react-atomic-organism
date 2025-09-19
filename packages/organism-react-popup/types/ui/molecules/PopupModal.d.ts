export default PopupModal;
export type PopupModalProps = import("./BasePopup").BasePopupProps & any;
export type PopupModalState = import("./BasePopup").BasePopupState & any;
/**
 * 1. if you need trace show: true
 * it extend from PopupOverlay
 *
 * 2. if you don't need append <Content /> component
 * you could pass center or content to equla false
 */
/**
 * @extends {PopupOverlay}
 */
declare class PopupModal extends PopupOverlay {
    static defaultProps: {
        mask: boolean;
        name: string;
        modalClassName: string;
    };
    /**
     * @type {PopupModalState}
     */
    state: PopupModalState;
    /**
     * @type any
     */
    _timer: any;
    _mount: boolean;
    _locked: boolean;
    /**
     * @type any
     */
    _observer: any;
    /**
     * @param {HTMLElement} el
     */
    handleModalRefCb: (el: HTMLElement) => HTMLElement;
    el: HTMLElement;
    handleClose: () => void;
    /**
     * @param {React.MouseEvent} e
     */
    handleContainerClick: (e: React.MouseEvent) => void;
    handleKeyUp: (/** @type KeyboardEvent*/ e: KeyboardEvent) => void;
    reCalculate: () => void;
    getBodyResetClass(): string;
    resetBodyCssClass(): void;
    setBodyCssClass(): void;
    lockScreen(): void;
    unlockScreen(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
import PopupOverlay from "../molecules/PopupOverlay";
