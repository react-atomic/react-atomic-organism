import { Coordinate, NearLocType } from "./types";
/**
 * @param {HTMLElement} dom
 * @returns {Coordinate}
 */
export declare const getDomCenter: (dom: HTMLElement) => Coordinate;
/**
 * @param {Coordinate} center
 * @param {Coordinate} floatXY
 * @returns {NearLocType}
 */
export declare const getNearLocation: (center: Coordinate, floatXY: Coordinate) => NearLocType;
export type NearWhereConfig = {
    compareCenter?: boolean | undefined;
    adjustXY?: Coordinate | undefined;
};
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
