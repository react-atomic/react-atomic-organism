export type AnimationData = {
    className: string;
    key: string;
    name: string;
    timeout: number;
    delay: number;
};
/**
 * @param {string} key
 * @param {string} aniName
 * @param {number} timeout
 * @param {function} callback
 */
export function initAni(key: string, aniName: string, timeout: number, callback: Function): void;
/**
 * @typedef {object} AnimationData
 * @property {string} className
 * @property {string} key
 * @property {string} name
 * @property {number} timeout
 * @property {number} delay
 */
/**
 * @param {string} s
 * @returns {AnimationData}
 */
export function parseAniValue(s?: string): AnimationData;
