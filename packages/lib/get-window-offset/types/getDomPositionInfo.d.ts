/**
 * @typedef {import("./MaybeHTMLElement").MaybeHTMLElement} MaybeHTMLElement
 */
export class DomInfoType extends OffsetType {
    /**
     * @type MaybeHTMLElement
     */
    scrollNode: MaybeHTMLElement;
    /**
     * @type MaybeHTMLElement
     */
    fixedNode: MaybeHTMLElement;
}
export default getDomPositionInfo;
export type MaybeHTMLElement = import("./MaybeHTMLElement").MaybeHTMLElement;
import { OffsetType } from "getoffset";
/**
 * @param {HTMLElement} dom
 * @returns {{domInfo: DomInfoType, fixedNode: MaybeHTMLElement, scrollNode: MaybeHTMLElement}}
 */
declare function getDomPositionInfo(dom: HTMLElement): {
    domInfo: DomInfoType;
    fixedNode: MaybeHTMLElement;
    scrollNode: MaybeHTMLElement;
};
