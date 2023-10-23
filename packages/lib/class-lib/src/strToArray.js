//@ts-check

/**
 * @param {any} maybeString
 * @returns {string[]}
 */
export const strToArray = (maybeString) =>
  ((maybeString ?? "") + "").split(" ");
