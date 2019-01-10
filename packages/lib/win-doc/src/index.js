const doc = () => ('undefined' !== typeof document ? document : null);

const win = () => ('undefined' !== typeof window ? window : null);

export {doc, win};
