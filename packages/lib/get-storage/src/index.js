'use strict';

import get from 'get-object-value';

const storage = storageType => key => value =>
{
    if ('undefined' === typeof window) {
        return;
    }
    const win = window;
    const store = get(win, [storageType]);
    if ('undefined' === typeof value) {
        return store.getItem(key);
    } else {
        return store.setItem(key, value);
    }
}

const localStorage = storage('localStorage');

const sessionStorage = storage('sessionStorage');

export {
    localStorage,
    sessionStorage
};
