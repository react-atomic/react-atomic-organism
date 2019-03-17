import {UNDEFINED} from 'reshow-constant';

const doc = () => (UNDEFINED !== typeof document ? document : {});

const win = () => (UNDEFINED !== typeof window ? window : {});

export {doc, win};
