const doc = () => ('undefined' !== typeof document ? document : {});

const win = () => ('undefined' !== typeof window ? window : {});

export {doc, win};
