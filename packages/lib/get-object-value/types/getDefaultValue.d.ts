export default getDefaultValue;
export type DefaultValueOption = {
    obj?: any;
    prev?: any;
    next?: any;
    nextIndex?: string | number;
    path?: any[];
};
/**
 * @typedef {{obj?: any, prev?: any, next?: any, nextIndex?: string | number, path?: any[] }} DefaultValueOption
 */
/**
 * @param {any} v
 * @param {DefaultValueOption} [options]
 * @returns {any}
 */
declare function getDefaultValue(v: any, options?: DefaultValueOption): any;
