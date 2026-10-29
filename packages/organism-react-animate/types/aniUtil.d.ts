/**
 * @param {string} key
 * @param {string} aniName
 * @param {number} timeout
 * @param {function} callback
 */
declare const initAni: (key: string, aniName: string, timeout: number, callback: Function) => void;
export type AnimationData = {
    className: string;
    key: string;
    name: string;
    timeout: number;
    delay: number;
};
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
declare const parseAniValue: (s?: string) => AnimationData;
export { initAni, parseAniValue };
