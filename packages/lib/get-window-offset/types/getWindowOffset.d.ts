export default getWindowOffset;
export type IsOnScreenType = import('./isOnScreen').IsOnScreenType;
/**
 * @param {HTMLElement} dom
 * @param {boolean} [debug]
 * @returns {WindowOffsetType|undefined}
 */
declare function getWindowOffset(dom: HTMLElement, debug?: boolean): WindowOffsetType | undefined;
import { WindowOffsetType } from "./type";
