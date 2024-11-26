/**
 * @param {string} rawPath
 * @returns {function(number?):string}
 */
export default function handleAndStripAnchor(rawPath: string): (arg0: number | null) => string;
export function goToAnchor(anchor: string): (arg0: number | null) => any;
export function getAnchorPath(path?: string | undefined): AnchorPathType;
export function disableHandleAnchor(path: string): (arg0: number | null) => string;
declare class AnchorPathType {
    /**
     * @type string
     */
    anchor: string;
    /**
     * @type string
     */
    path: string;
    /**
     * @type string[]
     */
    anchorArr: string[];
    /**
     * @type string
     */
    lastAnchor: string;
}
export {};
