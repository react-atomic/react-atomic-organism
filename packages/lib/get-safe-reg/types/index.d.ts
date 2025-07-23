export function cacheReg(cache: object): (getRegCallback?: CallableFunction, flags?: string) => (regString: string) => RegExp;
export function safeMatch(testText: string, reg: RegExp): RegExpMatchArray | null;
export function wildcardToRegExp(path: string, { escape }?: wildcardToRegExpOptional): RegInput;
export function wildcardSearch(testString: string, path: string, wildcardOptional?: wildcardToRegExpOptional): Record<string, any> | boolean;
export default getSafeReg;
export type RegInput = {
    reg: RegExp;
    keys: string[];
};
export type EscapeType = "brackets" | "path" | "config";
export type wildcardToRegExpOptional = {
    escape?: EscapeType;
};
/**
 * @param {string} regString
 */
declare function getSafeReg(regString: string): string;
