export default getWindowOffset;
/**
 * @param {HTMLElement} dom
 * @param {boolean?} [debug]
 * @param {number} [margin]
 * @returns {WindowOffsetType|undefined}
 */
declare function getWindowOffset(dom: HTMLElement, debug?: boolean | null, margin?: number): WindowOffsetType | undefined;
import { WindowOffsetType } from "./types";
