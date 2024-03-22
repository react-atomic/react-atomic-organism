/**
 * @param {HTMLElement} targetEl
 * @param {HTMLElement|Coordinate} floatElOrFloatXY
 * @returns {NearLocType}
 */
export default function nearWhere(targetEl: HTMLElement, floatElOrFloatXY: HTMLElement | Coordinate): NearLocType;
export function getDomCenter(dom: HTMLElement): Coordinate;
export function getNearLocation(center: Coordinate, floatInfo: Coordinate): NearLocType;
import { Coordinate } from "./type";
import { NearLocType } from "./type";
