/**
 * @param {any} obj
 * @param {string[]} arrPath
 * @param {any} val
 * @param {boolean} [isAppend]
 * @param {boolean} [unSafe]
 */
declare const replaceValue: (obj: any, arrPath: string[], val: any, isAppend?: boolean, unSafe?: boolean) => void;
/**
 * @param {any} obj
 * @param {string[]} arrPath
 * @param {any} val
 * @param {boolean} [isAppend]
 */
declare const unsafeSet: (obj: any, arrPath: string[], val: any, isAppend?: boolean) => void;
export default replaceValue;
export { unsafeSet };
