import get from "get-object-value";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
 */
const getEventKey = (e) => get(e, ["key"], get(e, ["keyCode"]));
export default getEventKey;
