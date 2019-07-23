/**
 * !!Important!! do not use reshow-constant here
 * Bable will transpile it to double undefined
 */

const doc = w => {
  w = w || win();
  return 'undefined' !== typeof w.document ? w.document : {null: true};
}

const win = () => ('undefined' !== typeof window ? window : {null: true});

export {doc, win};
