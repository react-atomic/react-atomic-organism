export default removeEmpty;
/**
 * @param {any} [arr]
 * @param {boolean|function(any):boolean} [undefinedOnly]
 * @param {any[]} [excludeKey]
 * @returns {any}
 */
declare function removeEmpty(arr?: any, undefinedOnly?: boolean | ((arg0: any) => boolean), excludeKey?: any[]): any;
