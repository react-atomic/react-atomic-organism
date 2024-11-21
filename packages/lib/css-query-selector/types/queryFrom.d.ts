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
export namespace defaultQuery {
    let all: Function;
    let ancestor: Function;
    let el: Function;
    let one: Function;
}
export type QueryUtil = {
    all: Function;
    ancestor: Function;
    el: Function;
    one: Function;
};
