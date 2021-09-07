
import {UNDEFINED} from "reshow-constant";

const defaultObj = { __null: true };

const doc = (w, def = defaultObj) => {
  w = w || win();
  return UNDEFINED !== typeof w.document ? w.document : def;
};

const win = (def = defaultObj) =>
/**
 * !!Important!! do not use reshow-constant here
 * Bable will transpile it to double undefined
 */
  "undefined" !== typeof window ? window : def;

export { doc, win };
