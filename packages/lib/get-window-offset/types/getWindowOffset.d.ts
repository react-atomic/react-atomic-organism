export class WindowOffsetType extends CalWindowOffsetResult {
    /**
     * @type {DomInfoType}
     */
    domInfo: DomInfoType;
    /**
     * @type {ScrollInfoType}
     */
    scrollInfo: ScrollInfoType;
}
export default getWindowOffset;
declare class CalWindowOffsetResult {
    /**
     * @type string[]
     */
    locs: string[];
    /**
     * @type string
     */
    firstKey: string;
    /**
     * @type string
     */
    secondKey: string;
}
import { DomInfoType } from "./getDomPositionInfo";
import { ScrollInfoType } from "get-scroll-info";
/**
 * @param {HTMLElement} dom
 * @param {boolean} [debug]
 * @returns {WindowOffsetType|undefined}
 */
declare function getWindowOffset(dom: HTMLElement, debug?: boolean): WindowOffsetType | undefined;
