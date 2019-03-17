import get from 'get-object-value';
import Storage from './Storage';
import {win} from 'win-doc';
import {UNDEFINED} from 'reshow-constant';

const getStorage = storageType => key => value => {
  const oWin = win();
  if (!oWin) {
    return;
  }
  const store = get(oWin, [storageType]);
  if (UNDEFINED === typeof store) {
    console.warn('Not support. [' + storageType + ']');
    return;
  }
  if (UNDEFINED === typeof value) {
    return store.getItem(key);
  } else {
    try {
      return store.setItem(key, value);
    } catch (err) {
      store.clear();
      return store.setItem(key, value);
    }
  }
};

const localStorage = getStorage('localStorage');

const sessionStorage = getStorage('sessionStorage');

export {Storage, localStorage, sessionStorage};
