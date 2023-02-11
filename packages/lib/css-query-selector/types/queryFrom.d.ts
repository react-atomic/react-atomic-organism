export default queryFrom;
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
 * @returns {QueryUtil}
 */
declare function queryFrom(base: any): QueryUtil;
export namespace defaultQuery {
    const all: Function;
    const ancestor: Function;
    const el: Function;
    const one: Function;
}
