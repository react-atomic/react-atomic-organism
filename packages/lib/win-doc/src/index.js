//@ts-check

import { UNDEFINED, T_UNDEFINED } from "reshow-constant";

const defaultObj = { __null: true };

/**
 * @param {object|undefined} w
 * @param {any} def
 * @returns {Document}
 */
const doc = (w = T_UNDEFINED, def = defaultObj) => {
  /**
   * @type {Document}
   */
  const oDoc = (w || win()).document;
  return UNDEFINED !== typeof oDoc ? oDoc : def;
};

/**
 * @param {string} key
 * @returns {boolean}
 */
const hasWin = (key = "__null") => !win()[key];

/**
 * @param {any} def
 * @returns {window}
 */
const win = (def = defaultObj) =>
  /**
   * !!Important!! do not use reshow-constant here
   * Bable will transpile it to double undefined
   */
  "undefined" !== typeof window ? window : def;

export { doc, win, hasWin };
