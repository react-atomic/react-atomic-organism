export default nearWhere;
/**
 * @param {HTMLElement} targetEl
 * @param {HTMLElement|Coordinate} floatElOrFloatXY
 * @returns {NearLocType}
 */
declare function nearWhere(targetEl: HTMLElement, floatElOrFloatXY: HTMLElement | Coordinate): NearLocType;
/**
 * @param {Coordinate} center
 * @param {Coordinate} floatInfo
 * @returns {NearLocType}
 */
export function getNearLocation(center: Coordinate, floatInfo: Coordinate): NearLocType;
import { Coordinate } from "./type";
import { NearLocType } from "./type";
