/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
 *
 * Deprecated: KeyboardEvent.keyCode
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
 */
const getEventKey = (e) => e.key ?? e.keyCode;
export default getEventKey;
