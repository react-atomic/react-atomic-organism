/**
 * @typedef {object} NearWhereConfig
 * @property {boolean=} compareCenter
 * @property {Coordinate=} adjustXY
 */
/**
 * @param {HTMLElement} targetEl
 * @param {HTMLElement|Coordinate} floatElOrFloatXY
 * @param {NearWhereConfig=} nearWhereConfig
 * @returns {NearLocType}
 */
export default function nearWhere(targetEl: HTMLElement, floatElOrFloatXY: HTMLElement | Coordinate, nearWhereConfig?: NearWhereConfig | undefined): NearLocType;
export function getDomCenter(dom: HTMLElement): Coordinate;
export function getNearLocation(center: Coordinate, floatXY: Coordinate): NearLocType;
export type NearWhereConfig = {
    compareCenter?: boolean | undefined;
    adjustXY?: Coordinate | undefined;
};
import { Coordinate } from "./types";
import { NearLocType } from "./types";
