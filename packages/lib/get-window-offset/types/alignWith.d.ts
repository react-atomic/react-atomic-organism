import { OffsetType } from "getoffset";
/**
 * @param {OffsetType} targetInfo
 * @param {OffsetType} floatElInfo
 * @param {string} loc
 * @returns {[number, number]}
 */
declare const alignWith: (targetInfo: OffsetType, floatElInfo: OffsetType, loc: string) => [number, number];
export default alignWith;
