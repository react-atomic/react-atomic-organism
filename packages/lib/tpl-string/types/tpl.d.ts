/**
 * @param {string} s
 * @param {{[key: string]: any}} payload
 * @returns {string}
 */
declare const tpl: (s: string, payload: {
    [key: string]: any;
}) => string;
export default tpl;
