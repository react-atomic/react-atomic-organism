export function cacheReg(cache: object): (getRegCallback?: CallableFunction, flags?: string) => (regString: string) => RegExp;
export function safeMatch(testText: string, reg: RegExp): RegExpMatchArray;
export function wildcardToRegExp(path: string, { type }?: wildcardToRegExpOptional): RegInput;
export function wildcardSearch(testString: string, path: string, wildcardOptional?: wildcardToRegExpOptional): object | boolean;
export default getSafeReg;
export type RegInput = {
    reg: RegExp;
    keys: string[];
};
export type wildcardToRegExpOptional = {
    type?: ('bracketsEsc' | '');
};
/**
 * @param {string} regString
 */
declare function getSafeReg(regString: string): string;
