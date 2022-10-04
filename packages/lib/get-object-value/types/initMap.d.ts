export default initMap;
/**
 * Why need initMap?
 * const o = {};
 *
 * Before:
 * if (!o["foo"]) { // <-- u need do it, before every set.
 *  o["foo"] = [];
 * }
 * o.foo.push('bar');
 *
 * After:
 * initMap(o)("foo", []).push('bar');
 */
declare function initMap(o: any): (k: any, defaultValue: any) => any;
