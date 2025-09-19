export default PopupOverlay;
export type PopupOverlayProps = import("./BasePopup").BasePopupProps & any;
/**
 * @typedef {import("./BasePopup").BasePopupProps & Object} PopupOverlayProps
 * @property {HTMLElement} [targetEl] - Target element
 * @property {boolean} [toPool] - Use popup pool
 * @property {Object} [alignParams] - Alignment parameters
 * @property {number} [retryAt] - Retry timeout
 * @property {boolean} [isFollowTransform] - Follow transform
 * @property {string} [className] - CSS class name
 * @property {Object} [style] - CSS style object
 * @property {string} [group] - Group name
 * @property {boolean} [builtInOnly] - Built-in only
 * @property {any} [ref] - React ref
 * @property {function} [refCb] - Ref callback
 */
/**
 * @extends {BasePopup}
 */
declare class PopupOverlay extends BasePopup {
    constructor(props: any);
    props: any;
    /**
     * @param {string} key
     * @param {object} thisStyle
     */
    resetStyle(key: string, thisStyle: object): void;
    /**
     * @param {any} props
     */
    renderOverlay(props: any): any;
    /**
     * @param {boolean} show
     */
    shouldShow(show: boolean): any;
    render(): any;
}
import BasePopup from "../molecules/BasePopup";
