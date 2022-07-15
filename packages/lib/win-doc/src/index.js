import { UNDEFINED } from "reshow-constant";

const defaultObj = { __null: true };

const doc = (w, def) => {
  const oDoc = (w || win()).document;
  return UNDEFINED !== typeof oDoc ? oDoc : def || defaultObj;
};

const hasWin = (key) => !win()[key || "__null"];

const win = (def) =>
  /**
   * !!Important!! do not use reshow-constant here
   * Bable will transpile it to double undefined
   */
  "undefined" !== typeof window ? window : def || defaultObj;

export { doc, win, hasWin };
