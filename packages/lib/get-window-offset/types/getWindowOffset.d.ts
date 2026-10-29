import { WindowOffsetType } from "./types";
/**
 * @param {HTMLElement} dom
 * @param {boolean?} [debug]
 * @param {number} [margin]
 * @returns {WindowOffsetType|undefined}
 */
declare const getWindowOffset: (dom: HTMLElement, debug?: boolean | null, margin?: number) => WindowOffsetType | undefined;
export default getWindowOffset;
