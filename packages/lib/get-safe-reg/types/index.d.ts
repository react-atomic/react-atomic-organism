/**
 * @param {string} regString
 */
declare const getSafeReg: (regString: string) => string;
/**
 * Check whether a string contains wildcard characters (* or ?)
 *
 * @param {any} str
 * @returns {boolean}
 */
export declare const isWildcard: (str: any) => boolean;
/**
 * @param {Record<string, RegExp>} cache
 */
export declare const cacheReg: (cache: Record<string, RegExp>) => (getRegCallback?: CallableFunction, flags?: string) => (regString: string) => RegExp;
/**
 * @param {string} testText
 * @param {RegExp} reg
 * @returns {RegExpMatchArray|null}
 */
export declare const safeMatch: (testText: string, reg: RegExp) => RegExpMatchArray | null;
export type RegInput = {
    reg: RegExp;
    keys: string[];
};
export type EscapeType = "brackets" | "path" | "config";
export type wildcardToRegExpOptional = {
    escape?: EscapeType;
};
/**
 * Normalize the given path string,
 * returning a regular expression.
 *
 * An empty array should be passed,
 * which will contain the placeholder
 * key names.
 * For example "/user/:id" will contain ["id"].
 *
 * @param  {string} path
 * @param  {wildcardToRegExpOptional} wildcardOptional
 * @return {RegInput}
 */
export declare const wildcardToRegExp: (path: string, { escape }?: wildcardToRegExpOptional) => RegInput;
/**
 * @param {string} testString
 * @param {string} path
 * @param  {wildcardToRegExpOptional} [wildcardOptional]
 * @returns { Record<string, any> | boolean }
 */
export declare const wildcardSearch: (testString: string, path: string, wildcardOptional?: wildcardToRegExpOptional) => Record<string, any> | boolean;
export default getSafeReg;
