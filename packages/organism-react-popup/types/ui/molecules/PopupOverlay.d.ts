export default PopupOverlay;
declare class PopupOverlay extends BasePopup {
    resetStyle(key: any, thisStyle: any): void;
    renderOverlay(props: any): JSX.Element;
    shouldShow(show: any): JSX.Element;
    render(): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>;
}
import BasePopup from "../molecules/BasePopup";
