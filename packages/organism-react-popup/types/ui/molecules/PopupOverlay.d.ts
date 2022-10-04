export default PopupOverlay;
declare class PopupOverlay extends BasePopup {
    resetStyle(key: any, thisStyle: any): void;
    renderOverlay(props: any): JSX.Element;
    shouldShow(show: any): JSX.Element;
}
import BasePopup from "../molecules/BasePopup";
