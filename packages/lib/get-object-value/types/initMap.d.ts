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
declare const initMap: (o: any) => (k: any, defaultValue: any) => any;
export default initMap;
