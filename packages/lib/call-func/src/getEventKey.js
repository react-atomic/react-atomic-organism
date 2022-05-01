/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
 */
const getEventKey = (e) => e.key ?? e.keyCode;
export default getEventKey;
