export function cacheReg(cache: object): (getRegCallback?: CallableFunction, flags?: string) => (regString: string) => any;
export function safeMatch(testText: string, reg: RegExp): RegExpMatchArray;
export function pathToRegExp(path: string): RegInput;
export function searchRegPath(testString: string, path: string): object | boolean;
export default getSafeReg;
export type RegInput = {
    reg: RegExp;
    keys: string[];
};
/**
 * @param {string} regString
 */
declare function getSafeReg(regString: string): string;
