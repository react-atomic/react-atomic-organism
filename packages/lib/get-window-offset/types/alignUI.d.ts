export default alignUI;
/**
 * @param {HTMLElement} targetEl
 * @param {HTMLElement} floatEl
 * @param {AlignParamsType} alignParams
 * @param {WindowOffsetType} winInfo
 * @returns {AlignUIResultType|false}
 */
declare function alignUI(targetEl: HTMLElement, floatEl: HTMLElement, alignParams: AlignParamsType, winInfo: WindowOffsetType): AlignUIResultType | false;
declare class AlignParamsType {
    /**
     * @type string
     */
    toLoc: string;
    /**
     * @type boolean
     */
    disableAutoLoc: boolean;
    /**
     * @type boolean
     */
    positionFixed: boolean;
    /**
     * @type string[]
     */
    exclude: string[];
}
import { WindowOffsetType } from "./types";
declare class AlignUIResultType {
    /**
     * @type string|undefined
     */
    loc: string | undefined;
    /**
     * @type string[]|undefined
     */
    locs: string[] | undefined;
    /**
     * @type [number, number]
     */
    move: [number, number];
    /**
     * @type string|undefined
     */
    toLoc: string | undefined;
    /**
     * @type string|undefined
     */
    locClassName: string | undefined;
}
