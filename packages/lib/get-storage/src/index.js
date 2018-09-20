import get from 'get-object-value';
import Storage from './Storage';

const getStorage = storageType => key => value => {
  if ('undefined' === typeof window) {
    return;
  }
  const win = window;
  const store = get(win, [storageType]);
  if ('undefined' === typeof store) {
    console.warn('window not support. [' + storageType + ']');
    return;
  }
  if ('undefined' === typeof value) {
    return store.getItem(key);
  } else {
    return store.setItem(key, value);
  }
};

const localStorage = getStorage('localStorage');

const sessionStorage = getStorage('sessionStorage');

export {Storage, localStorage, sessionStorage};
