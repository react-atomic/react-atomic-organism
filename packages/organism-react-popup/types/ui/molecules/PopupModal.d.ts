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
    handleKeyUp: (e: KeyboardEvent) => void;
    reCalculate: () => void;
    getBodyResetClass(): string;
    resetBodyCssClass(): void;
    setBodyCssClass(): void;
    lockScreen(): void;
    unlockScreen(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    /**
     * @param {boolean} show
     */
    shouldShow(show: boolean): import("react/jsx-runtime").JSX.Element;
}
import PopupOverlay from "../molecules/PopupOverlay";
import * as React from "react";
