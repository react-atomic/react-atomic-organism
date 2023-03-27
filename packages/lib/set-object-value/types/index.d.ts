export default replaceValue;
/**
 * @param {any} obj
 * @param {string[]} arrPath
 * @param {any} val
 * @param {boolean} [isAppend]
 * @param {boolean} [unSafe]
 */
declare function replaceValue(obj: any, arrPath: string[], val: any, isAppend?: boolean, unSafe?: boolean): void;
/**
 * @param {any} obj
 * @param {string[]} arrPath
 * @param {any} val
 * @param {boolean} [isAppend]
 */
export function unsafeSet(obj: any, arrPath: string[], val: any, isAppend?: boolean): void;
