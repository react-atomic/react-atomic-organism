export type QueryUtil = {
    all: Function;
    ancestor: Function;
    el: Function;
    one: Function;
};
/**
 * @typedef {object} QueryUtil
 * @property {Function} all
 * @property {Function} ancestor
 * @property {Function} el
 * @property {Function} one
 */
/**
 * @param {any} base
 * @returns {QueryUtil=}
 */
export default function queryFrom(base: any): QueryUtil | undefined;
export declare const defaultQuery: QueryUtil;
