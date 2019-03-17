/**
 * !!Important!! do not use reshow-constant here
 * Bable will transpile it to double undefined
 */

const doc = () => ('undefined' !== typeof document ? document : {});

const win = () => ('undefined' !== typeof window ? window : {});

export {doc, win};
