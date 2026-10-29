/**
 * @param {string} anchor
 * @returns {(delay?: number) => void}
 */
export declare const goToAnchor: (anchor: string) => (delay?: number) => void;
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
/**
 * @param {string=} path
 * @returns {AnchorPathType}
 */
export declare const getAnchorPath: (path?: string | undefined) => AnchorPathType;
/**
 * @param {string} path
 * @returns {(delay?: number) => string}
 */
export declare const disableHandleAnchor: (path: string) => (delay?: number) => string;
/**
 * @param {string} rawPath
 * @returns {(delay?: number) => string}
 */
export default function handleAndStripAnchor(rawPath: string): (delay?: number) => string;
export {};
