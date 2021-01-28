/**
 * !!Important!! do not use reshow-constant here
 * Bable will transpile it to double undefined
 */

const defaultObj = { __null: true };

const doc = (w, def = defaultObj) => {
  w = w || win();
  return "undefined" !== typeof w.document ? w.document : def;
};

const win = (def = defaultObj) =>
  "undefined" !== typeof window ? window : def;

export { doc, win };
