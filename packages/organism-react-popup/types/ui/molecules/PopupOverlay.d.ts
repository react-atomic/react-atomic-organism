export default PopupOverlay;
declare class PopupOverlay extends BasePopup {
    /**
     * @param {string} key
     * @param {object} thisStyle
     */
    resetStyle(key: string, thisStyle: object): void;
    /**
     * @param {any} props
     */
    renderOverlay(props: any): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
    /**
     * @param {boolean} show
     */
    shouldShow(show: boolean): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
    render(): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
}
import BasePopup from "../molecules/BasePopup";
