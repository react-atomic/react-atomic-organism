/**
 * @param {any} [arr]
 * @param {boolean|((value: any) => boolean)} [undefinedOnly]
 * @param {any[]} [excludeKey]
 * @returns {any}
 */
declare const removeEmpty: (arr?: any, undefinedOnly?: boolean | ((value: any) => boolean), excludeKey?: any[]) => any;
export default removeEmpty;
